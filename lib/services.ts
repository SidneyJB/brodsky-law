export type ServiceIconKey = "scale" | "shield" | "users" | "file-text";

export interface ServiceDetail {
  slug: string;
  title: string;
  shortDescription: string;
  icon: ServiceIconKey;
  heroHeading: string;
  heroSubtext: string;
  sections: { heading: string; body: string }[];
  ctaHeading: string;
  ctaSubtext: string;
}

export const services: ServiceDetail[] = [
  {
    slug: "uncontested-divorce",
    title: "Uncontested Divorce",
    shortDescription:
      "When both spouses agree on all issues, we guide you through the fastest, most affordable path to a final judgment, from $895 plus court fees.",
    icon: "scale",
    heroHeading: "Uncontested Divorce from $895",
    heroSubtext:
      "A straightforward, flat-fee process when both spouses are in agreement. We handle everything: drafting, filing, and follow-through, so you can focus on moving forward.",
    sections: [
      {
        heading: "What makes a divorce uncontested?",
        body: "A divorce is uncontested when both spouses agree on all issues: child custody and parenting time, property division, pensions and retirement accounts, debts, and any support arrangements. Both spouses must also be willing to accept and sign the divorce papers. When those conditions are met, the process is significantly faster and less costly than a contested proceeding.",
      },
      {
        heading: "Our flat-fee process",
        body: "After you complete our intake form, we review your information and reach out with any questions. Once payment is arranged, we prepare and file the Summons With Notice with the court and coordinate signature of the divorce papers with your spouse via in-person delivery, email, or mail. After we receive your spouse's signed papers, you sign the final package, we file it with the court, and then it is simply a matter of waiting for the court to issue the Judgment of Divorce. Processing times vary by county.",
      },
      {
        heading: "What if my spouse doesn't sign?",
        body: "If your spouse declines to sign, the divorce can still proceed. We can arrange formal service of process (through a friend/family member with our instructions, or a professional process server). Once formally served, your spouse has a limited time to respond. If they do nothing, we proceed as a default after 40 days. If they file a Notice of Appearance, the case transitions to a contested posture, and we remain by your side under a full retainer.",
      },
      {
        heading: "Pricing and payment plans",
        body: "$895 plus court fees covers a standard uncontested divorce. Matters involving children, property division, pension equitable distribution, or support may carry additional fees; we will always quote these clearly upfront. Payment plans are available; get started with as little as $400 down. If you earn less than your spouse, New York law may require them to contribute to your legal fees.",
      },
    ],
    ctaHeading: "Ready to start your uncontested divorce?",
    ctaSubtext: "Fill out our quick intake form and we'll review your case, provide an exact quote, and get things moving as soon as today.",
  },
  {
    slug: "contested-divorce",
    title: "Contested Divorce",
    shortDescription:
      "When spouses disagree on major issues or one refuses to cooperate, our experienced litigator fights to protect your rights, from custody to assets.",
    icon: "shield",
    heroHeading: "Experienced Contested Divorce Representation",
    heroSubtext:
      "When a divorce becomes contested, whether over children, money, or property, you need an experienced advocate who prepares every case as if it will go to court.",
    sections: [
      {
        heading: "What makes a divorce contested?",
        body: "A contested divorce arises when spouses cannot agree on one or more issues: child custody and parenting time, division of property or pensions, debt allocation, child support, or spousal maintenance. It can also arise when one spouse refuses to cooperate with service or will not acknowledge the proceedings.",
      },
      {
        heading: "Have you been served?",
        body: "If you have been served with divorce papers, time limits apply. You must respond within the required period or risk a default judgment. Call or text us at 646-444-3120 immediately. We will review the papers, explain your options, and protect your rights.",
      },
      {
        heading: "How we approach contested cases",
        body: "We prepare every case as if it may need to be litigated in full. That posture gives you maximum leverage in negotiation: opposing parties and their attorneys know we are ready to go to court. We guide you through the discovery process, negotiate aggressively on your behalf, and represent you at court appearances as needed. We do not recommend litigation for its own sake, but we never shy away from it when your interests require it.",
      },
      {
        heading: "Transitioning from uncontested",
        body: "If your divorce began as uncontested but your spouse has now retained counsel or filed a Notice of Appearance, your case has become contested. Contact us right away. We will transition your representation under a signed retainer agreement and put our full resources to work for you.",
      },
    ],
    ctaHeading: "Don't face a contested divorce alone.",
    ctaSubtext: "The sooner you have an experienced attorney reviewing your case, the stronger your position. Call 646-444-3120 or fill out our intake form now.",
  },
  {
    slug: "child-support",
    title: "Child Support",
    shortDescription:
      "New York's child support guidelines are formula-driven but contain important nuances. We make sure income is calculated correctly and all add-ons are addressed.",
    icon: "users",
    heroHeading: "Child Support: Protecting Your Children's Future",
    heroSubtext:
      "Your kids come first, and child support should reflect that. We guide you through New York's child support guidelines, make sure income is calculated correctly, and push for terms that protect your rights and your financial future.",
    sections: [
      {
        heading: "How New York calculates child support",
        body: "From base support to add-ons like health insurance, childcare, and extracurricular expenses, we address every component of support and advocate for a clear, enforceable arrangement that puts you in the strongest possible position.\n\nNew York uses the Child Support Standards Act (CSSA) to calculate basic child support as a percentage of combined parental income: 17% for one child, 25% for two, 29% for three, 31% for four, and no less than 35% for five or more. The calculation applies to combined income up to a statutory cap, with courts retaining discretion above that threshold.",
      },
      {
        heading: "Add-on expenses",
        body: "Beyond the basic support amount, the CSSA requires parents to share certain additional expenses in proportion to their incomes. These add-ons include health insurance, unreimbursed medical and dental costs, childcare expenses that enable the custodial parent to work or pursue education, and, at the court's discretion, educational costs and extracurricular activities.",
      },
      {
        heading: "Getting the income calculation right",
        body: "Incorrect income figures produce incorrect support. We scrutinize pay stubs, tax returns, business income, and other sources to ensure the calculation reflects reality and that no income is improperly excluded or double-counted. If a parent is voluntarily underemployed, courts may impute income at a higher level.",
      },
      {
        heading: "Enforcement and modification",
        body: "Child support orders are legally enforceable. If circumstances change materially, such as a job loss, a significant income change, or a change in custody arrangements, either parent may seek a modification. We guide both initial establishment and later modifications.",
      },
    ],
    ctaHeading: "Make sure child support is calculated correctly.",
    ctaSubtext: "A clear, enforceable child support order protects both you and your children. Contact us for a free case estimate.",
  },
  {
    slug: "spousal-maintenance",
    title: "Spousal Maintenance",
    shortDescription:
      "Whether you are seeking maintenance or being asked to pay it, we analyze every relevant factor and advocate for terms that reflect your financial reality.",
    icon: "file-text",
    heroHeading: "Spousal Maintenance: Advocating for Fair Terms",
    heroSubtext:
      "We analyze the length of the marriage, both spouses' incomes, and every factor that matters under New York law, then advocate for terms that serve your interests. Whether you are seeking maintenance or being asked to pay it, we press for a result that reflects the facts of your case and protects what you have built.",
    sections: [
      {
        heading: "How New York approaches maintenance",
        body: "We prepare every case as if it may need to be defended in court, so you are always negotiating from a position of strength.\n\nNew York uses statutory guidelines to calculate presumptive maintenance amounts and duration based on income. Courts may deviate from the guidelines by considering factors including the length of the marriage, each spouse's income and earning capacity, contributions to the other's education or career, health and age of the parties, tax consequences, and the standard of living established during the marriage.",
      },
      {
        heading: "Temporary vs. post-divorce maintenance",
        body: "Temporary maintenance may be ordered during the pendency of a divorce proceeding to preserve the financial status quo. Post-divorce (durational) maintenance is ordered in the final judgment and may be modifiable or non-modifiable depending on the negotiated terms. We address both phases strategically.",
      },
      {
        heading: "If you are seeking maintenance",
        body: "We build your case around documented income disparity, career sacrifices made during the marriage, and all other statutory factors. We advocate for terms that give you adequate time and resources to achieve financial independence, or for long marriages, for appropriate ongoing support.",
      },
      {
        heading: "If you are being asked to pay",
        body: "We scrutinize the claiming spouse's income, earning capacity, and independent assets. Maintenance is not automatic, and its amount and duration must be justified by the facts. We fight for a result that is fair and does not impose an unreasonable long-term burden.",
      },
    ],
    ctaHeading: "Get the right result on spousal maintenance.",
    ctaSubtext: "We analyze the full picture and advocate aggressively for terms that serve your interests. Reach out for a free case estimate.",
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return services.find((s) => s.slug === slug);
}
