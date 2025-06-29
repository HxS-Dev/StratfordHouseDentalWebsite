export const allTeamQuery =`*[_type == "team"] | order(publishedAt desc){
  _id,
  title,
  slug,
  position,
  gdn_no,
  mainImage,
  publishedAt,
  body
}`;

export const allArticleQuery =`*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  slug,
  description,
  author->{
    name
  },
  mainImage,
  categories[]->{
    title
  },
  publishedAt,
  body,
  richText_row_1,
  richText_row_2,
  richText_row_3,
  richText_row_4,
}`;



export const allTreatmentsQuery =`*[_type == "treatments"] | order(publishedAt desc){
  _id,
  title,
  slug,
  description,
  mainImage,
  categories[]->{
    title
  },
  publishedAt,
  body,
  richText_row_1,
  richText_row_2,
  richText_row_3,
  richText_row_4,
}`;



export const articleBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  mainImage,
  body,
  richText_row_1,
  richText_row_2,
  richText_row_3,
  richText_row_4,
  publishedAt
}`;


export const treatmentsBySlugQuery = `*[_type == "treatments" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  mainImage,
   categories[]->{
    title
  },
  body,
  richText_row_1,
  richText_row_2,
  richText_row_3,
  richText_row_4,
  publishedAt
}`;

export const allFeesQuery =`*[_type == "fees"] | order(publishedAt desc){
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  body,
  feesTable,
}`;

export const feesBySlugQuery = `*[_type == "fees" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  body,
  feesTables[] {
    title,
    table
  },
}`;