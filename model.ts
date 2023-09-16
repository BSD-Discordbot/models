import { type Generated } from 'kysely'

interface Player {
  discord_id: bigint
  balance: number
  last_daily: Date
  daily_streak: number
}

interface PlayerHasCard {
  discord_id: bigint
  card_id: number
  amount: number
  date_owned: Date
}

interface Tag {
  id: Generated<number>
  name: string
}

interface CardHasTag {
  tag: number
  card: number
}

interface Card {
  id: number
  rarity: number
}

interface CardUpgrade {
  card: number
  requirement: number
  amount: number
}

interface Event {
  id: Generated<number>
  start_time?: number
  end_time?: number
  name: string
  default: boolean
}

interface EventHasCard {
  event: number
  card: number
}

interface Database {
  player: Player
  player_has_card: PlayerHasCard
  card: Card
  card_upgrade: CardUpgrade
  event: Event
  event_has_card: EventHasCard
  tag: Tag
  card_has_tag: CardHasTag
}

export default Database
