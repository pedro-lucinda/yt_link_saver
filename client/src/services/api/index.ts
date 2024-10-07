import { NEXT_PUBLIC_API_URL } from "@/config/variables";
import { ILink } from "@/store/link/types";

/**
 *  Fetches the list of links from the API
 * @returns ILink[]
 */
export async function listLinks(): Promise<ILink[]> {
  const response = await fetch(
    `${NEXT_PUBLIC_API_URL}/api/link?skip=0&limit=100`,
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to get Links list");
  }

  return await response.json();
}

export interface ICreateLinkPayload {
  name: string;
  url: string;
}
/**
 *  Creates a new link
 * @param data  ICreateLinkPayload
 * @returns  ILink
 */
export async function createLink(data: ICreateLinkPayload): Promise<ILink> {
  const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/link`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log({ data });

  if (!response.ok) {
    throw new Error("Failed to create Link");
  }

  return await response.json();
}

/**
 *  Deletes a link
 * @param link_id
 *
 * @returns void
 */
export async function deleteLink(link_id: number): Promise<void> {
  const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/link/${link_id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete Link");
  }
}
