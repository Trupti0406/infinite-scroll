# Infinite Scroll Component

## Problem Statement

Create a React component that implements infinite scrolling functionality. The component should fetch and display images from an external API as the user scrolls down the page. When the last image in the currently loaded set becomes visible in the viewport, the next set of images should be fetched and displayed.

## Key Points of the Solution

1. **State Management:**
   - `data`: An array to store the fetched image data.
   - `pageNo`: A number to keep track of the current page number for API requests.

2. **Fetching Data:**
   - Use the `useEffect` hook to fetch data from the API whenever `pageNo` changes.
   - Append the newly fetched data to the existing data to maintain a cumulative list of images.

3. **Handling Infinite Scroll:**
   - Use another `useEffect` hook to set up an `IntersectionObserver`.
   - The observer checks if the last image in the list is visible in the viewport.
   - When the last image becomes visible, increment `pageNo` to trigger the next data fetch.

4. **Cleanup:**
   - Ensure proper cleanup of the observer when the component unmounts or when the observed element changes.

## What I Forgot in the Solution

To append new data:
```javascript
setData((prevData) => [...prevData, ...data]);