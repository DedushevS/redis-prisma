import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/src/prisma.service";
import {postDto} from "./app.dto";

@Injectable()
export class AppService {
  constructor(
    private readonly prisma: PrismaService) {
  }

  public async createUser(email: string, name: string) {
    await this.prisma.user.create({
      data: {
        email: email,
        name: name
      }
    })
  };

  public async createPost(post: postDto) {
    await this.prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        published: post.published,
        author: {connect: {id: post.authorId}}
      }
    })
  };

  public async updatePost(id: number, title?: string, content?: string) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: id
      }
    })
    const updatedPost: postDto = await this.prisma.post.update({
      where: {
        id: id
      },
      data: {
        title: title ? title : post.title,
        content: content ? content : post.content
      }
    })
    return updatedPost
  };

  // public async findUserAndPosts(id): {};
  //
  // public async findUsersAndPosts(ids): {};


}
