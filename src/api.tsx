import type { Comment } from "./types/Comment"
import type { Product } from "./types/Product"

const BASE_URL = "http://localhost:3001"

export const api = {
  getProducts: async () => {
    const res = await fetch(`${BASE_URL}/products`)
    if (!res.ok) throw new Error("Failed to fetch products")
    return res.json()
  },

  getProductById: async (id: number) => {
    const res = await fetch(`${BASE_URL}/products/${id}`)
    if (!res.ok) throw new Error("Failed to fetch product")
    return res.json()
  },

  createProduct: async (product: Omit<Product, "id">) => {
    const res = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    })
    if (!res.ok) throw new Error("Failed to create product")
    return res.json()
  },

  updateProduct: async (id: number, product: Partial<Product>) => {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    })
    if (!res.ok) throw new Error("Failed to update product")
    return res.json()
  },

  deleteProduct: async (id: number) => {
    const res = await fetch(`${BASE_URL}/products/${id}`, { method: "DELETE" })
    if (!res.ok) throw new Error("Failed to delete product")
    return res.json()
  },

  getComments: async () => {
    const res = await fetch(`${BASE_URL}/comments`)
    if (!res.ok) throw new Error("Failed to fetch comments")
    return res.json()
  },

  getCommentsByProductId: async (productId: number) => {
    const res = await fetch(`${BASE_URL}/comments?productId=${productId}`)
    if (!res.ok) throw new Error("Failed to fetch comments")
    return res.json()
  },

  createComment: async (comment: Omit<Comment, "id">) => {
    const res = await fetch(`${BASE_URL}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment)
    })
    if (!res.ok) throw new Error("Failed to create comment")
    return res.json()
  },

  deleteComment: async (id: number) => {
    const res = await fetch(`${BASE_URL}/comments/${id}`, { method: "DELETE" })
    if (!res.ok) throw new Error("Failed to delete comment")
    return res.json()
  }
}
