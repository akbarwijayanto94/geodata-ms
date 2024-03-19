import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm'

export abstract class BaseModel extends BaseEntity {
  @CreateDateColumn({ type: 'timestamptz', precision: 3 })
  createdAt: Date

  @Column('varchar', { nullable: true })
  createdBy: string

  @UpdateDateColumn({ type: 'timestamptz', precision: 3 })
  updatedAt: Date

  @Column('varchar', { nullable: true })
  updatedBy: string

  @DeleteDateColumn({ type: 'timestamptz', precision: 3 })
  deletedAt: Date

  @Column('varchar', { nullable: true })
  deletedBy: string
}
