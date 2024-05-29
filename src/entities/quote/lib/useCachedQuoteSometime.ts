"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AxiosError, AxiosResponse } from "axios";

import { getRandomIntegerInRange } from "@/shared/lib";
import type { QuoteResponse } from "../types/quoteTypes";
import { validateCachedQuotes } from "./validateCachedQuotes";

type UseQuoteStatus = "pending" | "success" | "error";

type OnResolveCallback = (quoteData: QuoteResponse) => void;
type OnRejectCallback = (error: AxiosError) => void;

interface UseQuoteReturn {
  quoteData: QuoteResponse | undefined;
  status: UseQuoteStatus;
  error: AxiosError | undefined;
  onResolve: (callback: OnResolveCallback) => void;
  onReject: (callback: OnRejectCallback) => void;
  refetch: () => void;
}

const QUOTES_CACHE_KEY = "quotes-cache";
const MAX_CACHED_QUOTES = 20;

export const useCachedQuoteSometime = (
  quotePromiseFn: () => Promise<AxiosResponse<QuoteResponse>>
): UseQuoteReturn => {
  const [quoteData, setQuoteData] = useState<QuoteResponse | undefined>();
  const [status, setStatus] = useState<UseQuoteStatus>("pending");
  const [error, setError] = useState<AxiosError | undefined>();

  const onResolveCallbackRef = useRef<OnResolveCallback | null>(null);
  const onRejectCallbackRef = useRef<OnRejectCallback | null>(null);

  const saveQuoteToCache = useCallback((quote: QuoteResponse): void => {
    const cachedData = localStorage.getItem(QUOTES_CACHE_KEY);
    if (!cachedData) {
      localStorage.setItem(QUOTES_CACHE_KEY, JSON.stringify([quote]));
      return;
    }

    const parsedCachedData = JSON.parse(cachedData);
    if (validateCachedQuotes(parsedCachedData)) {
      localStorage.setItem(
        QUOTES_CACHE_KEY,
        JSON.stringify([
          ...parsedCachedData.toSpliced(-1, MAX_CACHED_QUOTES),
          quote,
        ])
      );
    } else {
      localStorage.setItem(QUOTES_CACHE_KEY, JSON.stringify([quote]));
    }
  }, []);

  const getRandomQuoteFromCache = useCallback((): QuoteResponse | undefined => {
    const cachedData = localStorage.getItem(QUOTES_CACHE_KEY);
    if (!cachedData) return;

    const parsedCachedData = JSON.parse(cachedData);
    if (!validateCachedQuotes(parsedCachedData)) return;

    return parsedCachedData[
      getRandomIntegerInRange(0, parsedCachedData.length - 1)
    ];
  }, []);

  const onResolve = useCallback(
    (callback: OnResolveCallback): void => {
      onResolveCallbackRef.current = callback;
    },
    [onResolveCallbackRef]
  );

  const onReject = useCallback(
    (callback: OnRejectCallback) => {
      onRejectCallbackRef.current = callback;
    },
    [onRejectCallbackRef]
  );

  const fetchQuote = useCallback(() => {
    setStatus("pending");
    setError(undefined);

    quotePromiseFn()
      .then((res) => {
        setQuoteData(res.data);
        setStatus("success");
        saveQuoteToCache(res.data);
        if (onResolveCallbackRef.current)
          onResolveCallbackRef.current(res.data);
      })
      .catch((error) => {
        const cachedQuote = getRandomQuoteFromCache();

        if (cachedQuote) {
          setQuoteData(cachedQuote);
          setStatus("success");
          if (onResolveCallbackRef.current)
            onResolveCallbackRef.current(cachedQuote);
        } else {
          setError(error);
          setStatus("error");
          if (onRejectCallbackRef.current) onRejectCallbackRef.current(error);
        }
      });
  }, [
    quotePromiseFn,
    onResolveCallbackRef,
    onRejectCallbackRef,
    saveQuoteToCache,
    getRandomQuoteFromCache,
  ]);

  useEffect(() => {
    fetchQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    quoteData,
    status,
    error,
    onResolve,
    onReject,
    refetch: fetchQuote,
  };
};
