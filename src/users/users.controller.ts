import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Public } from 'src/decorators/public.decorator';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Create a new user
   * 
   * @param createUserDto the user to create
   * @returns the created user
   * - 400: Bad Request
   * - 401: Unauthorized
   * - 403: Forbidden
   * - 409: Conflict
   * - 201: Created
   */
  // @Roles(Role.Admin)
  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    if(!createUserDto) throw new BadRequestException();

    const user = await this.usersService.findOneByEmail(createUserDto.email);
    if(user) throw new ConflictException();

    return await this.usersService.create(createUserDto);
  }

  /**
   * Find all users
   * 
   * @returns all users and [] if no user
   * - 200: OK
   * - 401: Unauthorized
   * - 403: Forbidden
   */
  @Roles(Role.Admin)
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  /**
   * Find one user by id
   * 
   * @param id the user id
   * @returns the user
   * - 401: Unauthorized
   * - 403: Forbidden
   * - 404: Not Found
   * - 200: OK
   */
  @Roles(Role.Admin)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    if(!user) throw new NotFoundException();

    return user;
  }

  /**
   * Update a user
   * 
   * @param id the user id
   * @param updateUserDto the user to update
   * @returns the updated user
   * - 400: Bad Request
   * - 401: Unauthorized
   * - 403: Forbidden
   * - 404: Not Found
   * - 200: OK
   */
  @Roles(Role.Admin)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if(!updateUserDto) throw new BadRequestException();

    const user = await this.usersService.findOne(+id);
    if(!user) throw new NotFoundException();

    return await this.usersService.update(+id, updateUserDto);
  }

  /**
   * Delete a user
   * 
   * @param id the user id
   * @returns the deleted result
   * - 401: Unauthorized
   * - 403: Forbidden
   * - 404: Not Found
   * - 200: OK
   */
  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    if(!user) throw new NotFoundException();

    return await this.usersService.remove(+id);
  }

  /**
   * Get all users of a role
   * 
   * @param id the user id
   * @param role the role
   * @returns all users of the role
   * - 401: Unauthorized
   * - 403: Forbidden
   * - 200: OK
   * - 404: Not Found
   */
  @Roles(Role.Admin)
  @Patch(':id/role')
  async updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    if(!updateRoleDto) throw new BadRequestException();

    const user = await this.usersService.findOne(+id);
    if(!user) throw new NotFoundException();

    return this.usersService.updateRole(+id, updateRoleDto);
  }
}
