import * as drizzle_orm_pg_core from 'drizzle-orm/pg-core';
import * as drizzle_orm from 'drizzle-orm';

declare const user: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "user";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "user";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        nim: drizzle_orm_pg_core.PgColumn<{
            name: "nim";
            tableName: "user";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        email: drizzle_orm_pg_core.PgColumn<{
            name: "email";
            tableName: "user";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        fullName: drizzle_orm_pg_core.PgColumn<{
            name: "full_name";
            tableName: "user";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        birthDate: drizzle_orm_pg_core.PgColumn<{
            name: "birth_date";
            tableName: "user";
            dataType: "string";
            columnType: "PgDateString";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        phoneNumber: drizzle_orm_pg_core.PgColumn<{
            name: "phone_number";
            tableName: "user";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        idLine: drizzle_orm_pg_core.PgColumn<{
            name: "id_line";
            tableName: "user";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        idDiscord: drizzle_orm_pg_core.PgColumn<{
            name: "id_discord";
            tableName: "user";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        idInstagram: drizzle_orm_pg_core.PgColumn<{
            name: "id_instagram";
            tableName: "user";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "user";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        updatedAt: drizzle_orm_pg_core.PgColumn<{
            name: "updated_at";
            tableName: "user";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;

declare const accountRoleEnum: drizzle_orm_pg_core.PgEnum<["admin", "mamet", "mentor", "user", "guest"]>;
declare const account: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "account";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "account";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        nim: drizzle_orm_pg_core.PgColumn<{
            name: "nim";
            tableName: "account";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        password: drizzle_orm_pg_core.PgColumn<{
            name: "password";
            tableName: "account";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        role: drizzle_orm_pg_core.PgColumn<{
            name: "role";
            tableName: "account";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "admin" | "mamet" | "mentor" | "user" | "guest";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: ["admin", "mamet", "mentor", "user", "guest"];
            baseColumn: never;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "account";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        updatedAt: drizzle_orm_pg_core.PgColumn<{
            name: "updated_at";
            tableName: "account";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const accountRelation: drizzle_orm.Relations<"account", {
    user: drizzle_orm.One<"user", false>;
}>;

declare const mediaBucketEnum: drizzle_orm_pg_core.PgEnum<["core", "oskm", "dikpus", "profile", "submission-dikpus", "submission-oskm", "other"]>;
declare const media: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "media";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "media";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        creatorId: drizzle_orm_pg_core.PgColumn<{
            name: "creator_id";
            tableName: "media";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        name: drizzle_orm_pg_core.PgColumn<{
            name: "name";
            tableName: "media";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        bucket: drizzle_orm_pg_core.PgColumn<{
            name: "bucket";
            tableName: "media";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "core" | "oskm" | "dikpus" | "profile" | "submission-dikpus" | "submission-oskm" | "other";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: ["core", "oskm", "dikpus", "profile", "submission-dikpus", "submission-oskm", "other"];
            baseColumn: never;
        }, {}, {}>;
        type: drizzle_orm_pg_core.PgColumn<{
            name: "type";
            tableName: "media";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        url: drizzle_orm_pg_core.PgColumn<{
            name: "url";
            tableName: "media";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        updatedAt: drizzle_orm_pg_core.PgColumn<{
            name: "updated_at";
            tableName: "media";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "media";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;

export { account, accountRelation, accountRoleEnum, media, mediaBucketEnum, user };
