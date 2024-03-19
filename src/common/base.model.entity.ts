import { ApiResponseProperty } from '@nestjs/swagger'
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm'

export abstract class BaseModel extends BaseEntity {
  @CreateDateColumn({ type: 'timestamptz', precision: 3 })
  @ApiResponseProperty({
    type: Date,
  })
  createdAt: Date

  @Column('varchar', { nullable: true })
  @ApiResponseProperty({
    type: String,
  })
  createdBy: string

  @UpdateDateColumn({ type: 'timestamptz', precision: 3 })
  @ApiResponseProperty({
    type: Date,
  })
  updatedAt: Date

  @Column('varchar', { nullable: true })
  @ApiResponseProperty({
    type: String,
  })
  updatedBy: string

  @DeleteDateColumn({ type: 'timestamptz', precision: 3 })
  @ApiResponseProperty({
    type: Date,
  })
  deletedAt: Date

  @Column('varchar', { nullable: true })
  @ApiResponseProperty({
    type: String,
  })
  deletedBy: string
}
