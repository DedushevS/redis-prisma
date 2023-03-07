import {ApiModelProperty, ApiModelPropertyOptional} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {IsNumber, IsOptional} from "class-validator";

export class PostDto {
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
    this.published = published ? published : true;
    this.authorId = authorId;
  }
}

export class CreatePostDto {
  @ApiModelProperty({ description: 'Author id' })
  readonly authorId: number;

  @ApiModelPropertyOptional({ description: 'Title' })
  @IsOptional()
  readonly title: string;

  @ApiModelPropertyOptional({ description: 'content' })
  @IsOptional()
  readonly content: string;
}

export class UpdatePostDto {
  @ApiModelProperty({ description: 'Post id' })
  @IsNumber()
  readonly postId: number;

  @ApiModelPropertyOptional({ description: 'Title' })
  @IsOptional()
  readonly title: string;

  @ApiModelPropertyOptional({ description: 'Content' })
  @IsOptional()
  readonly content: string;
}