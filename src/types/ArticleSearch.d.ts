export interface ArticleSearch {
  status: string;
  copyright: string;
  response: Response;
}
export interface Response {
  docs?: DocsEntity[] | null;
  meta: Meta;
}
export interface DocsEntity {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  source: string;
  multimedia: MultimediaEntity[];
  headline: Headline;
  keywords: KeywordsEntity[];
  pub_date: string;
  document_type: string;
  news_desk: string;
  section_name: string;
  subsection_name?: string | null;
  byline: Byline;
  type_of_material: string;
  _id: string;
  word_count: number;
  uri: string;
  slideshow_credits?: string | null;
}
export interface MultimediaEntity {
  rank: number;
  subtype: string;
  caption?: null;
  credit?: null;
  type: string;
  url: string;
  height: number;
  width: number;
  legacy: Legacy;
  subType: string;
  crop_name: string;
}
export interface Legacy {
  xlarge?: string | null;
  xlargewidth?: number | null;
  xlargeheight?: number | null;
  thumbnail?: string | null;
  thumbnailwidth?: number | null;
  thumbnailheight?: number | null;
  widewidth?: number | null;
  wideheight?: number | null;
  wide?: string | null;
}
export interface Headline {
  main: string;
  kicker?: string | null;
  content_kicker?: null;
  print_headline?: null;
  name?: null;
  seo?: null;
  sub?: null;
}
export interface KeywordsEntity {
  name: string;
  value: string;
  rank: number;
  major: string;
}
export interface Byline {
  original?: string | null;
  person?: (PersonEntity | null)[] | null;
  organization?: null;
}
export interface PersonEntity {
  firstname: string;
  middlename?: string | null;
  lastname: string;
  qualifier?: null;
  title?: null;
  role: string;
  organization: string;
  rank: number;
}
export interface Meta {
  hits: number;
  offset: number;
  time: number;
}
