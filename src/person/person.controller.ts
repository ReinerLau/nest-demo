import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PersonService } from './person.service';

@Controller('api/person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get('find')
  query(@Query('name') name: string, @Query('age') age: number) {
    return `received: name=${name},age=${age}`;
  }

  @Get(':id')
  urlParam(@Param('id') id: string) {
    return `received: id=${id}`;
  }

  @Post()
  body(@Body() createPersonDto: CreatePersonDto) {
    return `received: ${JSON.stringify(createPersonDto)}`;
  }

  @Post('file')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: 'uploads/',
    }),
  )
  body2(
    @Body() createPersonDto: CreatePersonDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log(files);
    return `received: ${JSON.stringify(createPersonDto)}`;
  }

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Get()
  findAll() {
    return this.personService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
