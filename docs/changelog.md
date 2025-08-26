# Changelog

## revert(areas): restore Areas section content on Home
- Restored the Areas section to the Home page at its previous position between Services and Testimonials.
- Kept the top navigation item for Areas removed.
- Ensured the section retains id="areas" for deep linking and internal footer links.

## test(home): add smoke test to assert Areas section is present
- Added `src/__tests__/home-areas-section.test.tsx` to guard against accidental removal.
