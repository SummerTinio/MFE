# Microfrontends app
- multiple frontend SPA's 🍣🍤🦑 integrated into 1 host app 🍱.
  - in this case,
    - 🍱 1 host / container app - React
    - 3 remote subapps
      - 🦑 auth subapp - React
      - 🍣 marketing subapp - React
      - 🍤 dashboard subapp - Vue
  - integrated thru 📦📦📦 Webpack Module Federation
  - hosted on 🌐 AWS Cloudfront CDN 
- each subapp === free to choose any frontend framework
  - minimal cross-app communication 
    - 📨 via simple callbacks and events 
  - to ensure each subapp understands, 
    - 💌 regardless of its framework 
- visit this project here!
  - http://mfe.zappconcepts.com/

based on an MOOC by StephenGrider
