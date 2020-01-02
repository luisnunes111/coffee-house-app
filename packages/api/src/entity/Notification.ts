import {
	BaseEntity,
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import {v4} from "uuid";
import {User} from "./User";

@Entity()
export class Notification extends BaseEntity {
	constructor(props: any) {
		super();
		Object.assign(this, props);
	}

	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column("text")
	message: string;

	@ManyToOne(
		_ => User,
		user => user.notifications,
	)
	to_user: User;

	@OneToOne(_ => User)
	@JoinColumn()
	from_user: User;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@BeforeInsert()
	addId() {
		this.id = v4();
	}
}

//notification every time the stock is refilled (This notification must include the name of the employee who updated the stock.)
