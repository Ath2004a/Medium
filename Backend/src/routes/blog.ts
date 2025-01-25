import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode ,sign, verify } from 'hono/jwt'
import { createblogsInputs, updateblogInputs } from '@asc2812/medium-common'
import { JwtTokenExpired } from 'hono/utils/jwt/types'

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables:{
        userId: string
    }
}>();


blogRouter.use('/*', async (c, next) => {

    const autheader = c.req.header("Authorization") || " ";
    
    try{
        const user = await verify(autheader, c.env.JWT_SECRET)

        if(user){
        c.set("userId", user.id);
        await next();
        }
        else{
        return c.json({
                msg: "You are not logged in"
            })
        }
    }
    catch(e){
        return c.json({
            msg: "You are not logged in"
        })
    }
})

blogRouter.post('/', async (c) =>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json()
    const userId = c.get("userId")

    const { success } = createblogsInputs.safeParse(body)
    if(!success)
    {
        return c.json({
            msg: "Invalid inputs"
          })
    }

    try
    {
        const blog = await prisma.post.create({
            data:{
                title: body.title,
                content: body.content,
                authorId: userId

            }
        });

        return c.json({
            msg: "Data has been created (POST)",
            id: blog.id
        });
    }
    catch(e)
    {
        console.log(e);

        return c.json({
            msg: "An errors occur while creating a data. Please try again",
        });
    }
})
  
blogRouter.put('/', async (c) =>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();

    const { success } = updateblogInputs.safeParse(body)
    if(!success)
    {
        return c.json({
            msg: "Invalid inputs"
          })
    }

    try
    {
        const blog = await prisma.post.update({
            where:{
                id : body.id
            },
            data:{
                title: body.title,
                content: body.content
            }
        })

        return c.json({
            msg: "Your data has been updated (POST)",
            data : blog
        })
    }
    catch(e)
    {
        console.log(e);

        return c.json({
            msg: "An error occur while updating a data. Please try again",
        });
    }

})
  
blogRouter.get('/', async (c) =>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()

    try{
        const blog = await prisma.post.findFirst({
            where:{
                id : body.id
            }
        })

        return c.json({
            msg: "Your INFO has been successfully fetched (POST)",
            data : blog
        })
    }
    catch(e)
    {
        console.log(e);

        return c.json({
            msg: "An error occur while fetching a data. Please try again",
        });
    }
})

blogRouter.get('/bulk', async (c) =>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.post.findMany({
        select:{
            content: true,
            title: true,
            id: true,
            Users :{
                select:{
                    name: true,
                }
            }
        }
    })

    return c.json({
        data: blog
    })
}) 

blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const id = c.req.param("id")

    try{
        const blog = await prisma.post.findFirst({
            where:{
                id
            },
            select:{
                id: true,
                title: true,
                content: true,
                Users:{
                    select:{
                        name: true
                    }
                }
            }
        })

        return c.json({ 
            data: blog }
        );
    }
    catch{
        return c.json({
            msg: "Blog not found"
        })
    }
})