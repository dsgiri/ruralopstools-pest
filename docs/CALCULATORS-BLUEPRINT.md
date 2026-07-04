# Calculators Blueprint

This document outlines the blueprint for the 5 interactive calculators tailored for the Rural Ops Tools Pest platform. It details their purpose, required inputs, generated outputs, and reverse-engineered logic based on the provided designs.

## 1. Degree-day Accumulation
**Subtitle:** Daily GDD calculator with pest stage tracker
**Strategic Purpose:** The strongest free-tier hook. A grower sees "73% to peak flight" and immediately wants the alert that tells them when it hits 100%. That's the upgrade moment.

### Inputs
*   **Pest Selector (Pills):** Corn earworm, Fall armyworm, Soybean aphid, Bollworm
*   **Today's high (°F) (Slider):** Example 88°F
*   **Today's low (°F) (Slider):** Example 64°F
*   **Days accumulated (Slider):** Example 55 days

### Outputs
*   **Cumulative GDD progress to peak flight:** Progress bar with percentage (e.g., 100%)
*   **Pest Stage Timeline:** Visual steps (Egg hatch -> 1st instar -> Peak larvae -> Pupation -> Adult flight) with the active stage highlighted based on GDD thresholds.
*   **Today's GDD:** Numeric readout (e.g., 26.0 GDD)
*   **Cumulative GDD:** Numeric readout (e.g., 1,430 GDD)
*   **Days to peak:** Numeric readout (e.g., 0 days)

### Inferred Logic
*   **Today's GDD:** `((High + Low) / 2) - Base Temp`. (For the example 88 High and 64 Low, an average of 76 minus a standard base temp of 50 = 26.0 GDD).

---

## 2. Economic Threshold Calculator
**Subtitle:** Is it worth spraying? Break-even pest count.
**Strategic Purpose:** Answers the #1 question every agronomist asks: "Should I spray or not?". The live verdict (green/amber/red) makes it feel like a decision tool, not just a data tool. Highly shareable.

### Inputs
*   **Crop value ($/bu) (Number Input):** Example 5.20
*   **Yield potential (bu/ac) (Number Input):** Example 180
*   **Spray cost ($/ac) (Number Input):** Example 22
*   **% yield loss per pest unit (Slider):** Example 0.8%
*   **Current pest count (Slider):** Example 18 /100 sweep

### Outputs
*   **Economic threshold:** Numeric readout (e.g., 3 pests)
*   **Gross crop value:** Numeric readout (e.g., $936/ac)
*   **Verdict Banner:** Contextual color block (Green/Amber/Red) with text (e.g., "✓ Spray justified — pest count 513% above threshold")

### Inferred Logic
*   **Gross crop value:** `Crop value * Yield potential` ($5.20 * 180 = $936/ac).
*   **Economic threshold:** `Spray cost / (Gross crop value * % yield loss)`. ($22 / ($936 * 0.008) = 2.937, rounded to 3 pests).
*   **Percentage above threshold:** `((Current Count - Threshold) / Threshold) * 100`. (18 - 3 = 15. 15/3 = 5, or 500%—accounting for floating math/exact decimals yielding 513%).

---

## 3. Spray Timing Window Checker
**Subtitle:** Wind, temp & humidity go/no-go decision
**Strategic Purpose:** The 4-factor go/no-go checklist mirrors how agronomists actually think before spraying. The adjuvant toggle signals "this was built by someone who understands the field."

### Inputs
*   **Wind speed (mph) (Slider):** Example 7 mph
*   **Temperature (°F) (Slider):** Example 81°F
*   **Relative humidity (%) (Slider):** Example 58%
*   **Hours since last rain (Slider):** Example 26 hrs
*   **Adjuvant / spreader-sticker added (Toggle):** On/Off

### Outputs
*   **Checklist Items:**
    *   Wind speed: Value + Status (e.g., "7 mph — good")
    *   Temperature: Value + Status (e.g., "81°F — ideal")
    *   Humidity: Value + Status (e.g., "58% — adequate")
    *   Rain-free interval: Value + Status (e.g., "26 hrs — safe")
*   **Verdict Banner:** Contextual block (e.g., "✓ All conditions met — good window to spray now")

### Inferred Logic
*   Purely qualitative threshold mapping. (e.g., Wind < 10mph = Good; Temp 65-85 = Ideal; Rain interval > 24hrs = Safe). Adjuvant toggle likely reduces the required rain-free interval or humidity thresholds safely.

---

## 4. Trap Count ROI Estimator
**Subtitle:** Value of early detection vs. late response
**Strategic Purpose:** Convinces skeptical growers that installing traps is worth it. The crop selector makes it feel personalized instantly.

### Inputs
*   **Crop (Pills):** Corn, Soybeans, Cotton, Sorghum
*   **Acres managed (Slider):** Example 500 ac
*   **Trap detection lead (days) (Slider):** Example 10 days
*   **Yield saved by early spray (%) (Slider):** Example 8%

### Outputs
*   **Crop value at risk:** Numeric readout (e.g., $468K)
*   **Yield saved ($):** Numeric readout (e.g., $37,440)
*   **ROI on trapping:** Multiplier text (e.g., 150x return)

### Inferred Logic
*   **Crop value at risk:** `Acres managed * Base Value per Acre`. (Assuming the $936/ac from the previous calculator: 500 * $936 = $468,000).
*   **Yield saved:** `Crop value at risk * % Yield saved`. ($468,000 * 0.08 = $37,440).
*   **ROI on trapping:** `Yield saved / Estimated Trap Cost`. (If ROI is 150x, estimated trap/monitoring cost is ~$250 total: $37,440 / 150 = $249.60).

---

## 5. Pro Subscription Break-even
**Subtitle:** How many acres until RuralOpsTools Pest pays for itself
**Strategic Purpose:** Put this on the pricing page. When a grower with 800 acres sees "pays for itself 15x over," the $24/month objection disappears. It's the calculator that closes the sale.

### Inputs
*   **Acres you manage (Slider):** Example 800 ac
*   **Avg crop value ($/ac) (Slider):** Example $900/ac
*   **Avoided bad sprays/yr (Slider):** Example 2 sprays
*   **Spray cost ($/ac) (Slider):** Example $22/ac

### Outputs
*   **Avoided spray 1:** Numeric readout (e.g., $17,600 saved)
*   **Avoided spray 2:** Numeric readout (e.g., $17,600 saved)
*   **Annual subscription cost:** Static readout (e.g., $288/yr)
*   **Annual savings:** Numeric readout (e.g., $35,200/yr)
*   **Verdict Banner:** ROI statement (e.g., "Pays for itself 122.2x over — ROI of $34,912/yr")

### Inferred Logic
*   **Saved per spray:** `Acres managed * Spray cost`. (800 * $22 = $17,600).
*   **Annual savings:** `Saved per spray * Avoided bad sprays`. ($17,600 * 2 = $35,200).
*   **Net ROI:** `Annual savings - Annual subscription cost`. ($35,200 - $288 = $34,912).
*   **Multiplier:** `Annual savings / Annual subscription cost`. ($35,200 / $288 = 122.2x).
