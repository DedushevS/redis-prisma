import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/src/prisma.service";
import {PostDto} from "./app.dto";

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

  public async createPost(post: PostDto) {
    await this.prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        published: post.published,
        author: {connect: {id: Number(post.authorId)}}
      }
    })
  };

  public async updatePost(id: number, title?: string, content?: string) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: Number(id)
      }
    })
    const updatedPost: PostDto = await this.prisma.post.update({
      where: {
        id: Number(id)
      },
      data: {
        title: title ? title : post.title,
        content: content ? content : post.content
      }
    })
    return updatedPost
  };

  public async findUserAndPosts(id) {
    return await this.prisma.post.findMany({
      where: {
        authorId: id
      }
    })
  };

  public async findUsersAndPosts(usersIds: number[]) {
    const posts = await this.prisma.post.findMany({
      where: {
        authorId: {
          in: usersIds.map((it) => Number(it))
        }
      }
    })
    console.log(posts)
    return posts
  }

}
