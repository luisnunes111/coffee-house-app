import {Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import {v4} from "uuid";
import {Notification} from "./Notification";

export enum UserRole {
	Employee = "employee",
	Manager = "manager",
}

@Entity()
export class User extends BaseEntity {
	constructor(props: any) {
		super();
		Object.assign(this, props);
	}

	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column("varchar", {length: 150})
	name: string;

	@Column("varchar", {length: 255})
	email: string;

	@Column("varchar", {length: 255})
	password: string;

	@Column("int", {default: 0})
	tokenVersion: number;

	@Column("varchar")
	role: UserRole;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@OneToMany(
		_ => Notification,
		n => n.to_user,
	)
	notifications: Notification[];

	@BeforeInsert()
	addId() {
		this.id = v4();
	}
}
