import {
  createQueryBuilder,
  getConnection,
  getRepository,
  MigrationInterface,
  QueryRunner,
} from "typeorm";
import { StoreSeed } from "../seeds/stores.seed";
import { Store } from "../entities/Store";

export class SeedsTable1591201633239 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await getConnection()
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Store)
    //   .values(StoreSeed)
    //   .execute();
  }
  public async down(queryRunner: QueryRunner): Promise<void> {}
}