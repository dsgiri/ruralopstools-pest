# Storage Reusable Calculator Page Master Prompt

## 1. Purpose of this template
This template provides a standardized instruction set for AI coding agents to generate new calculator pages for the Storage section of the Rural Ops Tools application. It ensures that all future calculator pages share a consistent UI, UX, page structure, and tone with the established Grain Bin Capacity Estimator pattern, preventing design fragmentation and feature creep.

## 2. Design and product principles
- **Practical Tone:** Use clear, plainspoken, and action-oriented language. Avoid marketing fluff or SaaS jargon.
- **Transparent Assumptions:** Clearly state any constants, variables, or baseline assumptions used in the calculations. No hidden logic.
- **Useful Above the Fold:** The calculator interface must be immediately visible and usable without scrolling.
- **Clear Primary Result:** Results should have strong visual anchors (bold, oversized fonts, contrasting colors) so they are instantly scannable.
- **Strong Mobile Usability:** Forms and results must reflow gracefully on small screens, with touch-friendly controls.
- **No Fake Precision:** Round numbers appropriately and avoid suggesting exactness where it is merely an estimate.

## 3. Shared page structure
1. **Above the Fold:**
   - Clear H1 Header
   - Brief Intro/Summary Description
   - Calculator Interface (Inputs & Real-time Outputs)
2. **Below the Fold (Supporting Context):**
   - How It Works (Formulas & Logic)
   - Assumptions / Limitations
   - Glossary / Definitions of Terms
3. **Trust and Engagement:**
   - FAQ Section (Dropdown accordions)
   - Related Tools / Links
   - Share / Print options (if applicable)
   - Disclaimers (Data privacy and financial/structural liability)

## 4. Shared UI/UX rules
- **Hero Style:** Minimalist, focused on the H1 and a single sentence description.
- **Form Layout:** Left side (desktop) or top (mobile). Use standard Tailwind inputs, selects, and toggles.
- **Results Layout:** Right side (desktop) or bottom (mobile). Use sticky positioning on desktop if inputs are long.
- **Supporting Content Style:** Use clean, readable typography with proper H2/H3 hierarchy and bulleted lists.
- **FAQ Behavior:** Use standard accessible accordion components (e.g., `<details>`/`<summary>` or a custom accessible equivalent).
- **Related Tools:** Simple card grid or list pointing to other calculators.
- **Disclaimer Placement:** Small print at the bottom of the content area, just above the footer.
- **Footer Consistency:** Use the shared global footer component.

## 5. Shared accessibility rules
- All form inputs must have associated `<label>` elements or `aria-label` attributes.
- Ensure sufficient color contrast for text and interactive elements.
- Use semantic HTML (`<main>`, `<section>`, `<h1>`, `<h2>`).
- Accordions and interactive elements must be keyboard navigable.

## 6. Shared mobile rules
- Use a single-column layout for the calculator on screens smaller than `md` or `lg`.
- Ensure touch targets (buttons, inputs) are at least 44px tall.
- Keep the primary result visible or easily accessible on mobile (e.g., sticky bottom bar if appropriate, or immediately below inputs).

## 7. Shared repository safety rules
- **Do not modify global components** (e.g., Navbar, Footer) unless explicitly requested.
- **Do not invent new color schemes** or typography. Stick to the established Tailwind configuration.
- **Do not add new external dependencies** without permission.
- **Do not overwrite existing pages.**

## 8. Parameter list
Before using the master prompt template, you must define the following parameters:
- `{{CALCULATOR_NAME}}`: The exact title of the calculator (e.g., Feed Storage Capacity Calculator).
- `{{PAGE_SLUG}}`: The URL path/component name (e.g., FeedStorageCapacity).
- `{{PRIMARY_USER_GOAL}}`: The main problem this solves for the user.
- `{{INTRO_SUMMARY}}`: A one-sentence explanation of what the tool does.
- `{{INPUT_FIELDS}}`: A list of required user inputs (names, types, default values, units).
- `{{OUTPUT_FIELDS}}`: A list of the generated results (primary and secondary).
- `{{FORMULA_LOGIC}}`: The exact mathematical formulas to use.
- `{{ASSUMPTIONS}}`: Any baseline constants or limitations to list.
- `{{FAQ_TOPICS}}`: 3-4 common questions and answers.
- `{{RELATED_TOOLS}}`: Links to 2-3 other relevant calculators in the ecosystem.
- `{{DISCLAIMER_NOTES}}`: Specific warnings (e.g., "Consult a structural engineer").

## 9. Reusable master prompt template

```markdown
I need you to build a new calculator page for the Storage utility section of our application. Please follow the PIV (Plan-Implement-Validate) workflow.

**Context:**
This page must strictly follow the UI, UX, and architectural patterns established by the "Grain Bin Capacity Estimator". Do not invent new UI paradigms, layouts, or color schemes. Use Tailwind CSS and our existing component structure.

**Parameters:**
- **Calculator Name:** {{CALCULATOR_NAME}}
- **Component/Route:** {{PAGE_SLUG}}
- **Primary User Goal:** {{PRIMARY_USER_GOAL}}
- **Intro Summary:** {{INTRO_SUMMARY}}

**1. The Calculator Layout (Above the Fold):**
Implement a responsive two-column layout (inputs on left/top, outputs on right/bottom).
- **Input Fields:**
  {{INPUT_FIELDS}}
  Use appropriate visual controls (number inputs, dropdowns). Ensure all inputs have clear labels and units.
- **Output Fields:**
  {{OUTPUT_FIELDS}}
  Provide real-time updates. The primary result must use a bold, oversized visual anchor.

**2. Business Logic:**
- **Formulas:** {{FORMULA_LOGIC}}
- Implement this logic securely in the component. Handle edge cases (e.g., division by zero, negative inputs).

**3. Supporting Content (Below the Fold):**
- **How It Works / Assumptions:** Include a section explaining the math and listing these assumptions: {{ASSUMPTIONS}}
- **FAQ:** Build an accessible accordion section with these Q&As:
  {{FAQ_TOPICS}}
- **Related Tools:** Add a section linking to: {{RELATED_TOOLS}}
- **Disclaimer:** Add this disclaimer in small print at the bottom: {{DISCLAIMER_NOTES}}

**Constraints:**
- Ensure mobile-first responsiveness (min 44px touch targets).
- Ensure full accessibility (aria-labels, semantic HTML).
- Keep the tone practical and tool-first. No marketing fluff.
- Do NOT modify unrelated global components.
```

## 10. Usage instructions
1. Copy the **Reusable master prompt template** from Section 9.
2. Replace all `{{VARIABLES}}` with the specific details for the new calculator.
3. Provide the filled-in prompt to the AI coding agent.
4. Review the agent's output against the **Consistency checklist** in Section 12.

## 11. Example filled-in variants

### Feed Storage Capacity Calculator
- **{{CALCULATOR_NAME}}**: Feed Storage Capacity Calculator
- **{{INTRO_SUMMARY}}**: Estimate the total tonnage of feed your bunker or upright silo can hold based on dimensions and feed density.
- **{{INPUT_FIELDS}}**: Silo Type (Dropdown: Bunker, Tower), Width/Diameter (ft), Length (ft), Height (ft), Feed Density (lbs/cu ft).
- **{{OUTPUT_FIELDS}}**: Total Volume (cu ft), Total Capacity (Tons), Estimated Feeding Days.
- **{{FORMULA_LOGIC}}**: Volume for Tower = pi * (diameter/2)^2 * height. Volume for Bunker = width * length * height. Tons = (Volume * Density) / 2000.

### Equipment Storage Planner
- **{{CALCULATOR_NAME}}**: Equipment Storage Planner
- **{{INTRO_SUMMARY}}**: Calculate the required shed floor space based on the footprint of your tractors, implements, and vehicles.
- **{{INPUT_FIELDS}}**: Dynamic list of equipment (Name, Length (ft), Width (ft)). Allowance percentage for maneuvering (Default 20%).
- **{{OUTPUT_FIELDS}}**: Total Equipment Footprint (sq ft), Required Shed Size (sq ft).
- **{{FORMULA_LOGIC}}**: Sum of (Length * Width) for all equipment * (1 + Allowance/100).

### Spoilage Risk Assessor
- **{{CALCULATOR_NAME}}**: Spoilage Risk Assessor
- **{{INTRO_SUMMARY}}**: Evaluate the risk of grain spoilage based on current moisture content and storage temperature.
- **{{INPUT_FIELDS}}**: Grain Type (Corn, Soybeans, Wheat), Moisture Content (%), Grain Temperature (°F).
- **{{OUTPUT_FIELDS}}**: Allowable Storage Time (Days), Risk Level (Low, Moderate, High).
- **{{FORMULA_LOGIC}}**: Standard allowable storage time (AST) tables based on moisture and temp intersections.

### Storage Cost Analysis Matrix
- **{{CALCULATOR_NAME}}**: Storage Cost Analysis Matrix
- **{{INTRO_SUMMARY}}**: Compare the annualized cost of building new storage versus commercial storage fees.
- **{{INPUT_FIELDS}}**: Total Bushels, Commercial Storage Rate ($/bu/month), Months Stored, New Bin Cost ($), Interest Rate (%), Amortization Years.
- **{{OUTPUT_FIELDS}}**: Annual Commercial Cost ($), Annualized Bin Cost ($), Break-even point (Years).
- **{{FORMULA_LOGIC}}**: Commercial Cost = Bushels * Rate * Months. Annualized Bin Cost = PMT(Interest, Years, Bin Cost).

## 12. Consistency checklist
- [ ] Does the page use the standard H1 and intro summary format?
- [ ] Is the calculator interface above the fold and usable without scrolling?
- [ ] Does the layout use the standard two-column (desktop) / stacked (mobile) structure?
- [ ] Are the primary results visually prominent?
- [ ] Are all formulas and assumptions clearly stated below the calculator?
- [ ] Does the FAQ section use standard accordion behavior?
- [ ] Is the disclaimer present and formatted as small print?
- [ ] Is the mobile experience touch-friendly (44px targets)?
- [ ] Is the code clean, modular, and free of unnecessary dependencies?
