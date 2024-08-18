// For dynamic routes, we have to create a folder with [slug] as its name where 'slug' is the
// parameter passed in url. This parameter can be accessed from the 'params' prop received in
// the page component function.
export default function BlogPostPage({ params }) {
  return (
    <main>
      <h1>Blog Post</h1>
      <p>{params.slug}</p>
    </main>
  );
}
