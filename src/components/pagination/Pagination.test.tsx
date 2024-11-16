import Pagination from './Pagination';
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("Render Pagination", () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should render the Pagination component correctly when total pages are greater than 1", () => {
        render(
          <Pagination
            totalPages={4}
            currentPageIndex={3}
            handleChangeIndex={vi.fn()}
          />
        );
        const pageButtons = screen.getAllByRole("button");
        expect(pageButtons).toHaveLength(6); // 4 pages buttons + 2 navigation (Prev, Next)
    });


    it("should render the Pagination component correctly when total pages is equal to 1", () => {
      render(
        <Pagination
          totalPages={1}
          currentPageIndex={1}
          handleChangeIndex={vi.fn()}
        />
      );
      const pageButtons = screen.getAllByRole("button");
      expect(pageButtons).toHaveLength(3); // 1 page button + 2 navigation (Prev, Next)
      const previousButton = screen.getByRole("button", {
        name: /Previous/i,
      });
      expect(previousButton).toBeDisabled();
      const nextButton = screen.getByRole("button", { name: /Next/i });
      expect(nextButton).toBeDisabled();
    });

    it("should disable 'Previous' button on the first page", () => {
      render(
        <Pagination
          totalPages={4}
          currentPageIndex={1}
          handleChangeIndex={vi.fn()}
        />
      );
      const previousButton = screen.getByRole("button", { name: /Previous/i });
      expect(previousButton).toBeDisabled();
    });

    it("should disable 'Next' button on the last page", () => {
      render(
        <Pagination
          totalPages={4}
          currentPageIndex={4}
          handleChangeIndex={vi.fn()}
        />
      );
      const nextButton = screen.getByRole("button", { name: /Next/i });
      expect(nextButton).toBeDisabled();
    });

    it("should call handleChangeIndex with the correct index when the Previous page button is clicked", () => {
      const onPageChange = vi.fn();
      render(
          <Pagination
            totalPages={5}
            currentPageIndex={3}
            handleChangeIndex={onPageChange}
          />
      );
      
      fireEvent.click(screen.getByRole("button", { name: /Previous/i }));
      expect(onPageChange).toHaveBeenCalledWith(2);
      
    });

    it("should call handleChangeIndex with the correct index when the Next page button is clicked", () => {
      const onPageChange = vi.fn();
      render(
        <Pagination
          totalPages={5}
          currentPageIndex={3}
          handleChangeIndex={onPageChange}
        />
      );

      fireEvent.click(screen.getByRole("button", { name: /Next/i }));
      expect(onPageChange).toHaveBeenCalledWith(4);
    });

    it("should call handleChangeIndex with the correct index when a page button is clicked", () => {
      const onPageChange = vi.fn();
      render(
        <Pagination
          totalPages={5}
          currentPageIndex={2}
          handleChangeIndex={onPageChange}
        />
      );

      const pageButtons = screen.getAllByRole("button");
      fireEvent.click(pageButtons[5]);
      expect(onPageChange).toHaveBeenCalledWith(5);
    });
});
