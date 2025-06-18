import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {treatmentsType} from './treatmentsType'
import {treatmentsCategoryType} from './treatmentsCategoryType'
import {Team} from './team'
import {authorType} from './authorType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, Team, treatmentsType, treatmentsCategoryType],
}
