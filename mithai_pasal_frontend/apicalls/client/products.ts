import { GetRequest } from '@/lib/axios/axios';
import { baseUrl } from '@/lib/baseUrl';
import { productGetResponseType } from '@/types/Product';

export const getAllProducts = async (pageParams = 1, limit = 10, token: string | undefined) => {
  try {
    const response = await GetRequest(
      `${baseUrl}/product?page=${pageParams}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data as productGetResponseType;
  } catch (error) {
    throw error;
  }
};
