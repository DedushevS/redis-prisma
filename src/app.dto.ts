export class postDto {
  title: string;
  content: string;
  authorId: number;
  published?: boolean | true;

  constructor(
    title: string,
    content: string,
    authorId: number,
    published?: boolean,
  ) {
    this.title = title;
    this.content = content;
    this.published = published;
    this.authorId = authorId;
  }
}