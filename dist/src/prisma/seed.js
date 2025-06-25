"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _auth = require("../lib/auth");
const _client = require("@prisma/client");
const prisma = new _client.PrismaClient();
async function main() {
    const [adminPassword, userPassword] = await Promise.all([
        (0, _auth.hashPassword)('admin123'),
        (0, _auth.hashPassword)('user123')
    ]);
    const permissions = await prisma.$transaction([
        prisma.permission.upsert({
            where: {
                name: 'users:read'
            },
            update: {},
            create: {
                name: 'users:read',
                description: 'Read users',
                resource: 'users',
                action: 'read'
            }
        }),
        prisma.permission.upsert({
            where: {
                name: 'users:write'
            },
            update: {},
            create: {
                name: 'users:write',
                description: 'Create/update users',
                resource: 'users',
                action: 'write'
            }
        }),
        prisma.permission.upsert({
            where: {
                name: 'users:delete'
            },
            update: {},
            create: {
                name: 'users:delete',
                description: 'Delete users',
                resource: 'users',
                action: 'delete'
            }
        }),
        prisma.permission.upsert({
            where: {
                name: 'categories:read'
            },
            update: {},
            create: {
                name: 'categories:read',
                description: 'Read categories',
                resource: 'categories',
                action: 'read'
            }
        }),
        prisma.permission.upsert({
            where: {
                name: 'categories:write'
            },
            update: {},
            create: {
                name: 'categories:write',
                description: 'Create/update categories',
                resource: 'categories',
                action: 'write'
            }
        })
    ]);
    const categories = await prisma.$transaction([
        prisma.category.upsert({
            where: {
                name: 'Development'
            },
            update: {},
            create: {
                name: 'Development',
                description: 'Software dev',
                color: '#3B82F6'
            }
        }),
        prisma.category.upsert({
            where: {
                name: 'Design'
            },
            update: {},
            create: {
                name: 'Design',
                description: 'UI/UX and design',
                color: '#8B5CF6'
            }
        }),
        prisma.category.upsert({
            where: {
                name: 'Marketing'
            },
            update: {},
            create: {
                name: 'Marketing',
                description: 'Marketing content',
                color: '#10B981'
            }
        })
    ]);
    const [admin, user] = await prisma.$transaction([
        prisma.user.upsert({
            where: {
                email: 'admin@example.com'
            },
            update: {},
            create: {
                email: 'admin@example.com',
                name: 'System Admin',
                password: adminPassword,
                role: _client.UserRole.ADMIN
            }
        }),
        prisma.user.upsert({
            where: {
                email: 'user@example.com'
            },
            update: {},
            create: {
                email: 'user@example.com',
                name: 'Regular User',
                password: userPassword,
                role: _client.UserRole.USER
            }
        })
    ]);
    await Promise.all(permissions.map((permission)=>prisma.userPermission.upsert({
            where: {
                userId_permissionId: {
                    userId: admin.id,
                    permissionId: permission.id
                }
            },
            update: {},
            create: {
                userId: admin.id,
                permissionId: permission.id
            }
        })));
    await Promise.all([
        prisma.userCategory.upsert({
            where: {
                userId_categoryId: {
                    userId: admin.id,
                    categoryId: categories[0].id
                }
            },
            update: {},
            create: {
                userId: admin.id,
                categoryId: categories[0].id
            }
        }),
        prisma.userCategory.upsert({
            where: {
                userId_categoryId: {
                    userId: user.id,
                    categoryId: categories[1].id
                }
            },
            update: {},
            create: {
                userId: user.id,
                categoryId: categories[1].id
            }
        })
    ]);
    console.log('✅ Seed ok');
}
main().catch((err)=>{
    console.error('❌ Seed failed:', err);
    process.exit(1);
}).finally(()=>prisma.$disconnect());
