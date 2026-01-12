import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { TeamMembersService } from './team-members.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { UploadService } from '../upload/upload.service';

@Controller('team-members')
export class TeamMembersController {
  constructor(
    private readonly teamMembersService: TeamMembersService,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('photo', 1, {
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
      fileFilter: (_req, file, cb) => {
        const isImage = file.mimetype.match(/^image\/(jpg|jpeg|png|gif|webp)$/);
        if (!isImage) {
          return cb(
            new BadRequestException('Apenas imagens são permitidas'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async create(
    @Body() createTeamMemberDto: CreateTeamMemberDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (files && files.length > 0) {
      const imageUrl = await this.uploadService.uploadImage(files[0]);
      createTeamMemberDto.photo = imageUrl.url;
    }

    return this.teamMembersService.create(createTeamMemberDto);
  }

  @Get()
  findAll() {
    return this.teamMembersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamMembersService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FilesInterceptor('photo', 1, {
      fileFilter: (_req, file, cb) => {
        const isImage = file.mimetype.match(/^image\/(jpg|jpeg|png|gif|webp)$/);
        if (!isImage) {
          return cb(
            new BadRequestException('Apenas imagens são permitidas'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateTeamMemberDto: UpdateTeamMemberDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (files && files.length > 0) {
      const imageUrl = await this.uploadService.uploadImage(files[0]);
      updateTeamMemberDto.photo = imageUrl.url;
    }

    return this.teamMembersService.update(id, updateTeamMemberDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.teamMembersService.remove(id);
  }
}
