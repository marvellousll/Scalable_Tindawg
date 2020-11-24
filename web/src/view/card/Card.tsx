import { useMutation, useQuery } from '@apollo/client'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import FavoriteIcon from '@material-ui/icons/Favorite'
import * as React from 'react'
import { useMemo, useState } from 'react'
import TinderCard from 'react-tinder-card'
import { getPotentialMatches } from '../../graphql/getPotentialMatches'
import { GetPotential, SwipeLeft, SwipeRight } from '../../graphql/query.gen'
import { swipeLeft } from '../../graphql/swipeLeft'
import { swipeRight } from '../../graphql/swipeRight'
import { buttonListStyle, buttonStyle, cardStyle, tagStyle, viewportStyle } from '../../style/card'
import { ProfileView } from '../profileView/ProfileView'

// test image: https://i.insider.com/5df126b679d7570ad2044f3e?width=1100&format=jpeg&auto=webp
const alreadyRemoved: number[] = []

function Cards() {
  const { loading, data } = useQuery<GetPotential>(getPotentialMatches)
  if (loading || data == null) {
    return null
  }
  const potentialMatches = data.getPotentialMatches!
  let remainingMatches = potentialMatches

  const [characters, setCharacters] = useState(remainingMatches)
  const [open, setOpen] = useState(false)
  const [swipeRightMutation] = useMutation<SwipeRight>(swipeRight)
  const [swipeLeftMutation] = useMutation<SwipeLeft>(swipeLeft)

  const handleDblClick = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const childRefs: React.RefObject<any>[] = useMemo(
    () =>
      Array(potentialMatches.length)
        .fill(0)
        .map(() => React.createRef()),
    []
  )

  const swiped = (direction: string, idToDelete: number) => {
    alreadyRemoved.push(idToDelete)
    if (direction === 'right') {
      void swipeRightMutation({ variables: { userId: idToDelete } })
    } else {
      void swipeLeftMutation({ variables: { userId: idToDelete } })
    }
  }

  const outOfFrame = (userId: number) => {
    remainingMatches = remainingMatches.filter(character => character!.user.id !== userId)
    setCharacters(remainingMatches)
  }

  const swipe = async (dir: string) => {
    const cardsLeft = characters.filter(character => !alreadyRemoved.includes(character!.user.id))
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1]!.user.id // Find the card object to be removed
      const index = potentialMatches.map(character => character?.user.id).indexOf(toBeRemoved) // Find the index of which to make the reference to
      swiped(dir, toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir) // Swipe the card!
    }
  }

  return (
    <div>
      <div style={viewportStyle}>
        {characters.map((character, index) => (
          <div key={character!.user.id} ref={childRefs[index]}>
            <div onDoubleClick={handleDblClick}>
              <TinderCard
                onSwipe={async dir => swiped(dir, character!.user.id)}
                onCardLeftScreen={() => outOfFrame(character!.user.id)}
              >
                <div
                  style={{
                    ...cardStyle,
                    backgroundImage: `url(${character!.imageURL})`,
                    backgroundPosition: 'center',
                    backgroundSize: '200%',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  <h3 style={tagStyle}>{character!.dogName}</h3>
                </div>
              </TinderCard>
            </div>
            <ProfileView open={open} onClose={handleClose} userInfo={character!} />
          </div>
        ))}
        <div style={buttonListStyle}>
          <IconButton aria-label="Swipe Left" onClick={() => swipe('left')} style={buttonStyle}>
            <CloseIcon style={{ color: '#af2d2d' }} />
          </IconButton>
          <IconButton aria-label="Swipe Right" onClick={() => swipe('right')} style={{ ...buttonStyle, left: '60px' }}>
            <FavoriteIcon style={{ color: '#32E0C4' }} />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default Cards
