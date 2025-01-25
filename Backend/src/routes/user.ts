import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signupInputs ,signinInputs } from '@asc2812/medium-common'

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string
        JWT_SECRET: string
      }
}>()

userRouter.post('signup', async (c) =>{

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();

  const { success } = signupInputs.safeParse(body)
  if(!success)
  {
    return c.json({
      msg: "Invalid inputs"
    })
  }

  try
  {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,    
        password: body.password 
      }
    });

    const token = await sign({id : user.id}, c.env.JWT_SECRET)

  
    return c.json({
      msg: "YOU ARE SIGN-UP",
      jwt : token
    })
  }
  catch(e)
  {
    console.log(e)

    return c.json({
      error: "Error occurred during sign-up, Please try again",
    })
  }
})
 
userRouter.post('signin', async (c) =>{

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();

  const { success } = signinInputs.safeParse(body)
  if(!success)
  {
    return c.json({
      msg: "Invalid inputs"
    })
  }

  try
  {
    const user = await prisma.user.findUnique({
      where:{
        email: body.email,
        password: body.password
      }
    })

    const token = await sign({id : user.id}, c.env.JWT_SECRET)
  
    return c.json({
      msg: "YOU ARE ALREADY SIGN-IN",
      jwt : token
    })
  }
  catch(e)
  {
    console.log(e)

    return c.json({
      error: "Error occurred during sign-in, Please try again",
    })
  }
})