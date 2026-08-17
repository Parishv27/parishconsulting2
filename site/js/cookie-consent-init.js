/* Cookie consent (TermsFeed Cookie Consent 4.2.0, self-hosted in site/vendor/).
   Opt-in ("express") consent: nothing beyond strictly-necessary runs until the
   visitor agrees. The site sets no analytics or advertising cookies today, so
   only the strictly-necessary category is active; the categories are declared
   so that adding analytics later is a config change, not a rebuild. */
(function () {
  'use strict';
  if (!window.cookieconsent || typeof window.cookieconsent.run !== 'function') return;

  window.cookieconsent.run({
    notice_banner_type: 'simple',
    consent_type: 'express',
    palette: 'light',
    language: 'en',
    page_load_consent_levels: ['strictly-necessary'],
    /* The banner's default blurb enumerates every purpose the vendor supports,
       including measuring interest and personalizing marketing. This site does
       none of that, so the list is narrowed to what is actually true. */
    notice_banner_purposes_levels: ['strictly-necessary'],
    notice_banner_reject_button_hide: false,
    /* Without this the widget accepts website_privacy_policy_url but never
       renders the link, leaving the banner with no route to the policy. */
    notice_banner_insert_legal_urls: true,
    preferences_center_close_button_hide: false,
    page_refresh_confirmation_buttons: false,
    website_name: 'Parish Educational Consulting',
    /* Must be absolute: the widget runs isValidUrl() and silently drops a
       relative path. Built from origin so it follows localhost, the Vercel
       preview, and the eventual production domain without editing. */
    website_privacy_policy_url: window.location.origin + '/privacy-policy.html'
  });
})();
