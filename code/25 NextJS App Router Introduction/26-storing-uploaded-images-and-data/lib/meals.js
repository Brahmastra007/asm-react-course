import fs from 'node:fs';

import sql from 'better-sqlite3';
/* Install 'slugify' and 'xss' and import them here. 'Slugify' is used to generate slugs and
'xss' helps us protect against cross-site scripting attacks. */
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // throw new Error('Loading meals failed');
  return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
  // Slugify the title and force it to be lower case
  meal.slug = slugify(meal.title, { lower: true });
  // Sanitize the instructions to remove any harmful content
  meal.instructions = xss(meal.instructions);

  /* We want to store the images in the public folder because images stored there would be
  publicly available and can be rendered on the screen without problems. */

  // Get the extension from the image name
  const extension = meal.image.name.split('.').pop();
  // Generate a filename with extension
  const fileName = `${meal.slug}.${extension}`;

  /* Create a stream that allows us to write data to a certain file. 'createWriteStream'
  needs a path to write to and it will return a stream object which can be used to write
  to that path. */
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  /* Convert the image to a buffer by using 'arrayBuffer' function on the image object
  which will return a promise. */
  const bufferedImage = await meal.image.arrayBuffer();

  /* Now we want to write to the stream. The first argument is the buffer to write but we must
  convert the 'ArrayBuffer' to a 'Buffer' object. The second argument is the function that is
  executed when it is done writing. */

  stream.write(Buffer.from(bufferedImage), (error) => {
    // If we get an error while writing, throw an error.
    if (error) {
      throw new Error('Saving image failed!');
    }
  });

  /* Override the image object with the image path. But we should remove the 'public' segment
  here because all requests for images will automatically be sent to the 'public' folder only. */
  meal.image = `/images/${fileName}`;

  // Insert the meal data into the database
  db.prepare(`
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `).run(meal);
}
