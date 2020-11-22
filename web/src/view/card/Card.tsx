import { useQuery } from '@apollo/client'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import FavoriteIcon from '@material-ui/icons/Favorite'
import * as React from 'react'
import { useMemo, useState } from 'react'
import TinderCard from 'react-tinder-card'
import { GetPotentialMatches } from '../../graphql/query.gen'
import { buttonListStyle, buttonStyle, cardStyle, tagStyle, viewportStyle } from '../../style/card'
import { ProfileView } from '../profileView/ProfileView'
import { getPotentialMatches } from './getPotentialMatches'

const db = [
  {
    name: 'Dog1',
  },
  {
    name: 'Dog2',
  },
  {
    name: 'Dog3',
  },
  {
    name: 'Dog4',
  },
  {
    name: 'Dog5',
  },
]

const alreadyRemoved: string[] = []
let charactersState = db // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

function Cards() {
  const [characters, setCharacters] = useState(db)
  const [open, setOpen] = useState(false)
  const [hold, setHold] = useState(false)

  const handleMouseUp = () => {
    if (!hold) {
      setOpen(true)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleMouseDown = () => {
    setHold(false)
    setTimeout(() => {
      setHold(true)
    }, 200)
  }

  const childRefs: React.RefObject<any>[] = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map(() => React.createRef()),
    []
  )

  const swiped = (direction: string, nameToDelete: string) => {
    console.log('removing: ' + nameToDelete)
    alreadyRemoved.push(nameToDelete)
  }

  const outOfFrame = (name: string) => {
    console.log(name + ' left the screen!')
    charactersState = charactersState.filter(character => character.name !== name)
    setCharacters(charactersState)
  }

  const swipe = (dir: string) => {
    const cardsLeft = characters.filter(person => !alreadyRemoved.includes(person.name))
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
      const index = db.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir) // Swipe the card!
    }
  }

  const { loading, data } = useQuery<GetPotentialMatches>(getPotentialMatches, {
    variables: { location: 'LA' },
  })
  if (loading || data == null) {
    return null
  }

  console.log(data)
  return (
    <div>
      <div style={viewportStyle}>
        {characters.map((character, index) => (
          <>
            <div onMouseUp={handleMouseUp} onMouseDown={handleMouseDown}>
              {
                <TinderCard
                  ref={childRefs[index]}
                  key={character.name}
                  onSwipe={dir => swiped(dir, character.name)}
                  onCardLeftScreen={() => outOfFrame(character.name)}
                >
                  <div
                    style={{
                      ...cardStyle,
                      backgroundImage:
                        'url(https://i.insider.com/5df126b679d7570ad2044f3e?width=1100&format=jpeg&auto=webp)',
                      backgroundPosition: 'center',
                      backgroundSize: '200%',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    <h3 style={tagStyle}>{character.name}</h3>
                  </div>
                </TinderCard>
              }
            </div>
            <ProfileView open={open} onClose={handleClose} />
          </>
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
