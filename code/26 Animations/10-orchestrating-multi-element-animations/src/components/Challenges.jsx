import { useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { ChallengesContext } from '../store/challenges-context.jsx';
import ChallengeItem from './ChallengeItem.jsx';
import ChallengeTabs from './ChallengeTabs.jsx';

export default function Challenges() {
  const { challenges } = useContext(ChallengesContext);
  const [selectedType, setSelectedType] = useState('active');
  const [expanded, setExpanded] = useState(null);

  function handleSelectType(newType) {
    setSelectedType(newType);
  }

  function handleViewDetails(id) {
    setExpanded((prevId) => {
      if (prevId === id) {
        return null;
      }

      return id;
    });
  }

  const filteredChallenges = {
    active: challenges.filter((challenge) => challenge.status === 'active'),
    completed: challenges.filter(
      (challenge) => challenge.status === 'completed'
    ),
    failed: challenges.filter((challenge) => challenge.status === 'failed'),
  };

  const displayedChallenges = filteredChallenges[selectedType];

  return (
    <div id="challenges">
      <ChallengeTabs
        challenges={filteredChallenges}
        onSelectType={handleSelectType}
        selectedType={selectedType}
      >
        {/* This 'AnimatePresence' wrapper is added here to ensure that the last item which is removed
        from the challenges list also gets animated when it is removed as otherwise the whole list is
        directly removed from the DOM without any animation. This wrapper is wrapped around the list and
        the fallback so that when the last list item is removed, the list animates out while the fallback
        element animates in. The mode 'wait' is added here to wait for one component to complete its
        animation before other component starts its animation. */}
        <AnimatePresence mode="wait">
          {displayedChallenges.length > 0 && (
            <motion.ol
              // There should also be a 'key' present on all elements wrapped so that animations can be
              // applied correctly to all the elements when they are removed or added.
              key="list"
              // Adding configuration for applying animation when this list is removed. This will make the
              // list slide up and vanish when it is removed.
              exit={{ y: -30, opacity: 0 }}
              className="challenge-items"
            >
              {/* Adding 'AnimatePresence' wrapper here to apply animation to list items when they are removed */}
              <AnimatePresence>
                {displayedChallenges.map((challenge) => (
                  <ChallengeItem
                    key={challenge.id}
                    challenge={challenge}
                    onViewDetails={() => handleViewDetails(challenge.id)}
                    isExpanded={expanded === challenge.id}
                  />
                ))}
              </AnimatePresence>
            </motion.ol>
          )}

          {displayedChallenges.length === 0 && (
            <motion.p
              // Adding 'key' here
              key="fallback"
              // Adding configuration for applying animation to this fallback. This will make the fallback
              // slide down and appear when it is added and vice versa.
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              No challenges found.
            </motion.p>
          )}
        </AnimatePresence>
      </ChallengeTabs>
    </div>
  );
}
