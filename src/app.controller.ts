import {Controller, Get, ParseIntPipe, Post, Query} from '@nestjs/common';
import {AppService} from './app.service';
import {CreatePostDto, PostDto, UpdatePostDto} from "./app.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Post('createUser')
  public async createUser(
    @Query('userEmail') userEmail: string,
    @Query('userName') userName: string) {
    return this.appService.createUser(userEmail, userName);
  }

  @Post('createPost')
  public async createPost(@Query() createdPost: CreatePostDto) {
    const post = new PostDto(createdPost.title, createdPost.content, createdPost.authorId)
    return this.appService.createPost(post)
  }

  @Post('updatePost')
  public async updatePost(@Query() updatedPost: UpdatePostDto) {
    return this.appService.updatePost(updatedPost.postId, updatedPost.title, updatedPost.content);
  }

  @Get('UserAndPosts')
  public async findUserAndPosts(@Query('authorId', ParseIntPipe) authorId: number) {
    return this.appService.findUserAndPosts(authorId);
  }

  @Get('UsersAndPosts')
  public async findUsersAndPosts(@Query('usersIds') usersIds: []) {
    return this.appService.findUsersAndPosts(usersIds);
  }
}

