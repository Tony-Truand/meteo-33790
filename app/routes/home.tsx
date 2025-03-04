import { randomInt } from "node:crypto";
import { Form, useNavigation, type ActionFunctionArgs } from "react-router";
import prisma from "~/models/db.server";
import { getSession } from "~/sessions.server";
import { cn } from "~/utils/tailwind";
import { wait } from "~/utils/wait";


export async function action({ request }: ActionFunctionArgs) {
  // Simule un temps de traitement un peu long
  await wait(randomInt(10) * 500)

  const session = await getSession(
    request.headers.get("Cookie")
  );

  const { userId } = session.data


  if (userId) {

    const datas = {
      id: userId,
      lastActionAt: new Date(),
    }

    await prisma.user.upsert({
      where: {
        id: userId
      },
      create: datas,
      update: datas,
    })
  }


  return {}
}

export default function Home() {

  const { state } = useNavigation()

  const isSubmitting = state === 'submitting'

  return (
    <div>
      <h1>Vos endroits préférés</h1>

      <Form action="" method="POST" className={cn("join", isSubmitting && "opacity-90")}>
        <label className="input input-sm join-item">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
          <input type="search" name="place" className="grow join-item" placeholder="L'endroit de vos rêves"
            required
            disabled={isSubmitting}
          />
        </label>
        <button name="intent" value="add-place" className="btn btn-sm join-item"
          disabled={isSubmitting}
        ><span className={cn(isSubmitting && "animate-spin")}>🌍</span></button>
      </Form>
    </div>
  )
}