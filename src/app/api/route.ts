import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

/*
app/page.js---------------->  www.xxx.com/
app/api/route.js----------->  www.xxx.com/api
*/

export const revalidate = 60;
export const runtime = "edge"; // 'nodejs' is the default
export const dynamic = "auto";
export const dynamicParams = true;
export const fetchCache = "auto";
export const preferredRegion = "auto";

export async function GET() {
  const res = await fetch("https://data.mongodb-api.com/...", {
    headers: {
      "Content-Type": "application/json",
      "API-Key": process.env.DATA_API_KEY as string,
    },
    next: { revalidate: 60 },
  });
  const data = await res.json();

  return NextResponse.json({ data });
}

/**
 * 路由处理程序在以下情况下动态计算：
 *   Using the Request object with the GET method.
 *   - 使用 Request 对象和 GET 方法。
 *   Using any of the other HTTP methods.
 *   - 使用任何其他HTTP方法。
 *   Using Dynamic Functions like cookies and headers.
 *   - 使用动态函数，如 cookies 和 headers 。
 *   The Segment Config Options manually specifies dynamic mode.
 *   - 段配置选项手动指定动态模式。
 * @param request
 * @returns
 */
export async function GETDynamic(
  request: Request,
  { params }: { params: { slug: string } }
) {
  //const token = request.cookies.get('token')
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const slug = params.slug;
  //app/items/[slug]/route.js	/items/a	{ slug: 'a' }
  //app/items/[slug]/route.js	/items/b	{ slug: 'b' }

  const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "set-cookie": `token=${token?.value}`,
      "API-Key": process.env.DATA_API_KEY as string,
    },
  });
  const product = await res.json();

  return NextResponse.json({ product });
}

/**
 * get header and set CORS
 * @param request
 * @returns
 */
export async function GETDynamic2(request: Request) {
  //const requestHeaders = new Headers(request.headers)
  const headersList = headers();
  const referer = headersList.get("referer");

  return new Response("Hello, Next.js!", {
    status: 200,
    headers: {
      referer: referer as string,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function GETRedirect() {
  redirect("https://www.baidu.com");
}

export async function POST() {
  const res = await fetch("https://data.mongodb-api.com/...", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "API-Key": process.env.DATA_API_KEY as string,
    },
    body: JSON.stringify({ time: new Date().toISOString() }),
  });

  const data = await res.json();

  return NextResponse.json(data);
}

// https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
function iteratorToStream(iterator: any) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();

      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

const encoder = new TextEncoder();

async function* makeIterator() {
  yield encoder.encode("<p>One</p>");
  await sleep(200);
  yield encoder.encode("<p>Two</p>");
  await sleep(200);
  yield encoder.encode("<p>Three</p>");
}

export async function GETStream() {
  const iterator = makeIterator();
  const stream = iteratorToStream(iterator);

  return new Response(stream);
}
