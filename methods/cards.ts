import db from '..'
import Database from '../model'

export async function getAllCards(){
    const cardArray = await db
    .selectFrom('card')
    .selectAll()
    .orderBy('card.id')
    .execute()

  const result = await Promise.all(
    cardArray.map(async (card) => {
      const tags = await db
        .selectFrom('card_has_tag')
        .select(['card_has_tag.tag'])
        .where('card_has_tag.card', '=', card.id)
        .execute()

      return { tags: tags.map((e) => e.tag), ...card }
    })
  )

  const cards: Record<number, Omit<Database['card'], 'id'>> = {}
  result.forEach((c) => {
    const { id, ...card } = c
    cards[id] = card
  })
  return cards
}