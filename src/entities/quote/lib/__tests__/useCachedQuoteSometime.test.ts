import { renderHook, act, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, type MockedObject } from "vitest";
import axios, { type AxiosResponse, type AxiosError } from "axios";

import { useCachedQuoteSometime } from "../useCachedQuoteSometime";
import type { QuoteResponse } from "../../types/quoteTypes";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}));
const mockedAxios = axios as MockedObject<typeof axios>;

const QUOTES_KEY = "quotes-cache";

describe("useQuote", () => {
  const mockQuoteResponse: QuoteResponse = {
    _id: "1",
    author: "Test Author",
    authorSlug: "test",
    content: "This is a test quote",
    length: 20,
    tags: ["test"],
    dateAdded: "2024-01-01",
    dateModified: "2024-01-01",
  };

  const mockAxiosResponse = {
    data: mockQuoteResponse,
    status: 200,
    statusText: "OK",
    headers: {},
    config: {},
  } as AxiosResponse<QuoteResponse>;

  const mockAxiosError: AxiosError = {
    config: {},
    name: "AxiosError",
    message: "Network Error",
    isAxiosError: true,
    response: undefined,
    toJSON: () => ({}),
  } as AxiosError;

  it("should fetch and return quote data successfully", async () => {
    mockedAxios.get.mockResolvedValueOnce(mockAxiosResponse);
    const { result } = renderHook(() =>
      useCachedQuoteSometime(() =>
        mockedAxios.get<QuoteResponse>("https://api.quotable.io/random")
      )
    );

    await waitFor(() => {
      expect(result.current.status).toBe("success");
      expect(result.current.quoteData).toStrictEqual(mockQuoteResponse);
      expect(result.current.error).toBeUndefined();
    });
  });

  it("should handle error correctly", async () => {
    mockedAxios.get.mockRejectedValueOnce(mockAxiosError);

    const { result } = renderHook(() =>
      useCachedQuoteSometime(() =>
        mockedAxios.get<QuoteResponse>("https://api.quotable.io/random")
      )
    );

    await waitFor(() => {
      expect(result.current.status).toBe("error");
      expect(result.current.quoteData).toBeUndefined();
      expect(result.current.error).toStrictEqual(mockAxiosError);
    });
  });

  it("should call onResolve callback on success", async () => {
    mockedAxios.get.mockResolvedValueOnce(mockAxiosResponse);

    const onResolveMock = vi.fn();
    const { result } = renderHook(() =>
      useCachedQuoteSometime(() =>
        mockedAxios.get<QuoteResponse>("https://api.quotable.io/random")
      )
    );

    act(() => {
      result.current.onResolve(onResolveMock);
    });

    await waitFor(() => {
      expect(onResolveMock).toHaveBeenCalledWith(mockQuoteResponse);
    });
  });

  it("should call onReject callback on error", async () => {
    mockedAxios.get.mockRejectedValueOnce(mockAxiosError);

    const onRejectMock = vi.fn();
    const { result } = renderHook(() =>
      useCachedQuoteSometime(() =>
        mockedAxios.get<QuoteResponse>("https://api.quotable.io/random")
      )
    );

    act(() => {
      result.current.onReject(onRejectMock);
    });

    await waitFor(() => {
      expect(onRejectMock).toHaveBeenCalledWith(mockAxiosError);
    });
  });

  it("should allow refetching the quote", async () => {
    mockedAxios.get.mockResolvedValueOnce(mockAxiosResponse);

    const { result } = renderHook(() =>
      useCachedQuoteSometime(() =>
        mockedAxios.get<QuoteResponse>("https://api.quotable.io/random")
      )
    );

    await waitFor(() => {
      expect(result.current.status).toBe("success");
      expect(result.current.quoteData).toStrictEqual(mockQuoteResponse);
    });

    const newMockQuoteResponse: QuoteResponse = {
      _id: "2",
      content: "This is another test quote",
      author: "Another Test Author",
      authorSlug: "test",
      length: 20,
      tags: ["test"],
      dateAdded: "2024-01-01",
      dateModified: "2024-01-01",
    };

    mockedAxios.get.mockResolvedValueOnce({
      ...mockAxiosResponse,
      data: newMockQuoteResponse,
    });

    act(() => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(result.current.status).toBe("success");
      expect(result.current.quoteData).toStrictEqual(newMockQuoteResponse);
    });
  });

  it("should save a fetched quote to the cache", async () => {
    mockedAxios.get.mockResolvedValueOnce(mockAxiosResponse);

    const { result } = renderHook(() =>
      useCachedQuoteSometime(() =>
        mockedAxios.get<QuoteResponse>("https://api.quotable.io/random")
      )
    );

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    const cachedData = JSON.parse(localStorage.getItem(QUOTES_KEY) || "");

    expect(cachedData).toStrictEqual([mockAxiosResponse.data]);
  });

  it("should resolve with a cached quote when fetch fails", async () => {
    mockedAxios.get.mockRejectedValueOnce(mockAxiosError);

    localStorage.setItem(QUOTES_KEY, JSON.stringify([mockAxiosResponse.data]));

    const { result } = renderHook(() =>
      useCachedQuoteSometime(() =>
        mockedAxios.get<QuoteResponse>("https://api.quotable.io/random")
      )
    );

    await waitFor(() => {
      expect(result.current.status).toBe("success");
      expect(result.current.quoteData).toStrictEqual(mockQuoteResponse);
      expect(result.current.error).toBeUndefined();
    });
  });
});
