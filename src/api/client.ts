/**
 * API 客户端 — 封装 fetch 调用
 * 开发时通过 Vite proxy 转发到 localhost:3001
 */

const BASE_URL = '/api'

/** 通用 GET 请求 */
export async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`)
  if (!res.ok) {
    throw new Error(`API 请求失败: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

/** 带查询参数的 GET */
export async function getWithParams<T>(
  path: string,
  params: Record<string, string>
): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`, window.location.origin)
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value)
  })
  const res = await fetch(url.toString())
  if (!res.ok) {
    throw new Error(`API 请求失败: ${res.status} ${res.statusText}`)
  }
  return res.json()
}
