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
import { buttonListStyle, cardStyle, tagStyle, viewportStyle } from '../../style/card'
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

  const [dogs, setDogs] = useState(potentialMatches)
  const [open, setOpen] = useState(false)
  const [swipeRightMutation] = useMutation<SwipeRight>(swipeRight)
  const [swipeLeftMutation] = useMutation<SwipeLeft>(swipeLeft)
  const handleClickOpen = () => {
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
    console.log('removing: ' + idToDelete)
    alreadyRemoved.push(idToDelete)
    if (direction === 'right') {
      void swipeRightMutation({ variables: { userId: idToDelete } })
    } else {
      void swipeLeftMutation({ variables: { userId: idToDelete } })
    }
  }

  const outOfFrame = (userId: number) => {
    console.log(userId + ' left the screen!')
    remainingMatches = dogs.filter(dog => dog!.user!.id !== userId)
    setDogs(remainingMatches)
  }

  const swipe = (dir: string) => {
    const cardsLeft = dogs.filter(dog => !alreadyRemoved.includes(dog!.user!.id))
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1]!.user!.id // Find the card object to be removed
      const index = potentialMatches.map(dog => dog!.user!.id).indexOf(toBeRemoved) // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir) // Swipe the card!
    }
  }

  return (
    <div>
      <div style={viewportStyle}>
        {dogs.map((dog, index) => (
          <div key={dog!.user!.id} onDoubleClick={handleClickOpen}>
            <TinderCard
              ref={childRefs[index]}
              onSwipe={dir => swiped(dir, dog!.user!.id)}
              onCardLeftScreen={() => outOfFrame(dog!.user!.id)}
            >
              <div
                style={{
                  ...cardStyle,
                  backgroundImage: `url(${dog!.imageURL})`,
                  backgroundPosition: 'center',
                  backgroundSize: '200%',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <h3 style={tagStyle}>{dog!.dogName}</h3>
              </div>
            </TinderCard>
            <ProfileView open={open} onClose={handleClose} userInfo={dog!} />
          </div>
        ))}
        <div style={buttonListStyle}>
          <IconButton aria-label="delete" onClick={() => swipe('left')} style={{ boxShadow: '0 0 2px rgba(0,0,0,.2)' }}>
            <CloseIcon style={{ color: '#af2d2d' }} />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => swipe('right')}
            style={{ boxShadow: '0 0 2px rgba(0,0,0,.2)', left: '60px' }}
          >
            <FavoriteIcon style={{ color: '#32E0C4' }} />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default Cards
