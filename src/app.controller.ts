import {Controller, DefaultValuePipe, HttpStatus, Param, ParseIntPipe, Post, Query} from '@nestjs/common';
import {AppService} from './app.service';
import {postDto} from "./app.dto";

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
  public async createPost(
    @Query('authorId', ParseIntPipe) authorId: number,
    @Query('title') title: string,
    @Query('content') content: string,
  ) {
    const post = new postDto(title, content, authorId)
    return this.appService.createPost(post)
  }


  @Post('updatePost')
  public async updatePost(
    @Query('postId', new ParseIntPipe()) postId: number,
    @Param('title', new DefaultValuePipe('')) title?: string,
    @Param('content', new DefaultValuePipe('')) content?: string,) {
    return this.appService.updatePost(postId, title, content);
  }

//
// @Get('UserAndPosts')
// public async findUserAndPosts(userId) {
//   return this.appService.findUserAndPosts(userId);
// }
//
// @Get('UsersAndPosts')
// public async findUsersAndPosts([usersIds]) {
//   return this.appService.findUsersAndPosts([usersIds]);
// }


}

