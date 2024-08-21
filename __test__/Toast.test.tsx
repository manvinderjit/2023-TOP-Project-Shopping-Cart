import React from 'react';
import { renderWithProviders } from './test-utils';
import { initialToasts } from './mockdata';
import { fireEvent, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routerConfig from './routerConfig';

describe("should render toasts", () => {

    const _router = createMemoryRouter(routerConfig, {
      initialEntries: ["/"],
    });

    beforeEach(() => {
        renderWithProviders(<RouterProvider router={_router} />, {
          preloadedState: {
            toast: initialToasts,
          },
        });
    });

    it("should render all toast messages", async() => {
        // Post Expectations
        expect(await screen.getAllByText('Cool Keyboards added to cart!')).toHaveLength(2);
        expect(await screen.getAllByText('ABC 27G2SP Monitor added to cart!')).toHaveLength(2);
        expect(await screen.getAllByText('Cool Keys RGB Keyboard added to cart!')).toHaveLength(1);
    });

    it("should remove a toast message after its closed", async() => {
        // Pre Expectations
        expect(await screen.getAllByText('Cool Keyboards added to cart!')).toHaveLength(2);
        expect(await screen.getAllByText('ABC 27G2SP Monitor added to cart!')).toHaveLength(2);
        expect(await screen.getAllByText('Cool Keys RGB Keyboard added to cart!')).toHaveLength(1);

        // Action: Remove all toasts of a single product
        const buttonsCloseToast = screen.getAllByRole('button', { name: /ABC 27G2SP Monitor added to cart!/i});
        fireEvent.click(buttonsCloseToast[0]);
        
        
        // Post Expectations
        expect(await screen.getAllByText('Cool Keyboards added to cart!')).toHaveLength(2);
        expect(await screen.getAllByText('ABC 27G2SP Monitor added to cart!')).toHaveLength(1);
        expect(await screen.getAllByText('Cool Keys RGB Keyboard added to cart!')).toHaveLength(1);

    });

    it("should remove multiple toast messages after they are closed", async() => {
        // Pre Expectations
        expect(await screen.getAllByText('Cool Keyboards added to cart!')).toHaveLength(2);
        expect(await screen.getAllByText('ABC 27G2SP Monitor added to cart!')).toHaveLength(2);
        expect(await screen.getAllByText('Cool Keys RGB Keyboard added to cart!')).toHaveLength(1);

        // Action: Remove all toasts of a single product
        const buttonsCloseToast = screen.getAllByRole('button', { name: /ABC 27G2SP Monitor added to cart!/i});        
        for(let i = 0; i < buttonsCloseToast.length; i ++) {
            fireEvent.click(buttonsCloseToast[i]);
        }
        
        // Post Expectations
        expect(await screen.getAllByText('Cool Keyboards added to cart!')).toHaveLength(2);
        expect(await screen.queryAllByText('ABC 27G2SP Monitor added to cart!')).toHaveLength(0);
        expect(await screen.getAllByText('Cool Keys RGB Keyboard added to cart!')).toHaveLength(1);

    });
    
})