# Week 3 Research – Innovation and Security

## 1. SWOT Analysis for the Momentum App

The **SWOT analysis** evaluates the internal and external factors affecting our Momentum app:

### Strengths
- Clear value proposition: supporting productivity for users with ADHD and similar conditions.
- Strong front-end skills with modern frameworks (React, Tailwind, Mantine).
- Accessibility-focused design from day one.
- Active use of GitHub, version control, and modular architecture.

### Weaknesses
- No dedicated QA or DevSecOps process yet.
- Potential lack of automated security testing (e.g., no SAST or dependency scanning currently configured).
- Limited initial user base for early feedback.
- Backend may need hardening against misuse or injection attacks.

### Opportunities
- Increasing demand for mental health and productivity tools.
- Integration of AI/ML features for goal recommendations.
- Possible open-source contribution and community building.
- Security and compliance research can lead to stronger, more reliable features.

### Threats
- Use of outdated or vulnerable dependencies.
- Lack of encryption or poor access control may expose user data.
- Strong competition in the productivity space.
- Regulatory pressure regarding user data storage, especially for sensitive populations.

---

## 2. OWASP Top 10 Risks

Security is vital to any web app. OWASP's Top 10 list outlines the most critical web application risks. Here are three that are especially relevant to the Momentum app:

### A01: Broken Access Control
Access control flaws can allow unauthorized users to view or modify data. Examples include URL tampering or missing role-based access checks. We must enforce proper route protection and middleware authentication.

### A05: Security Misconfiguration
Common issues include default credentials, exposed admin interfaces, or overly verbose error messages. This risk affects CI/CD pipelines, container setups, and app deployments. Hardened configs and infrastructure-as-code checks can help.

### A06: Vulnerable and Outdated Components
Using dependencies with known CVEs (common vulnerabilities and exposures) can expose the app. Tools like Dependabot or Snyk can automatically flag these issues.

---

## 3. Code Scanning with CodeQL and Alternatives

### What is CodeQL?
CodeQL is a static analysis tool from GitHub that queries codebases like databases. It can detect vulnerabilities like SQL injection, XSS, or improper auth handling. It integrates well with GitHub Actions for CI/CD workflows.

### Alternatives

#### 🔹 Semgrep
- Lightweight and fast.
- Easy to customize with rules.
- Great for dev teams that want fast feedback during development.

#### 🔹 SonarQube / SonarCloud
- Focuses on code quality, smells, and security issues.
- Includes dashboards and metrics.
- Good for integrating into dev team pipelines.

#### 🔹 Snyk
- Focuses on dependency scanning (SCA) and known vulnerabilities.
- Also supports static code analysis.
- Great for monitoring third-party package risk.

### Integration Recommendations
- Use **CodeQL** in GitHub Actions to scan code in pull requests.
- Pair with **Snyk CLI** or **Dependabot** to monitor dependencies.
- Optionally, add **Semgrep** or **SonarCloud** for broader issue detection and DevOps reporting.

---

## 4. EFF Topic: Creativity & Innovation

The [Electronic Frontier Foundation (EFF)](https://www.eff.org/issues/creativity-innovation) advocates for user rights and open access. One of their highlighted topics is:

### “Freedom to Tinker”
EFF defends developers’ rights to explore, fix, or improve code without legal repercussions (e.g., from the DMCA). They argue that innovation depends on the freedom to break, understand, and improve tech.

**Relevance to Momentum:**
- Promotes building with interoperability and user freedom in mind.
- Encourages open APIs, data portability, and optional open-source licensing.
- Inspires trust by respecting user ownership and access to their data.

---

## 5. Impact on Development

This week’s research reinforces the importance of:

- **Security as a feature**: We will integrate CodeQL scans, validate inputs, and limit permissions using least privilege principles.
- **Compliance**: Regularly audit third-party dependencies, keep licenses clear, and plan for user privacy/export tools.
- **Innovation culture**: Embrace open standards, clear documentation, and user empowerment (e.g., data export, creative customization).

We now view automated scanning and secure defaults as critical to Momentum's success—both in stability and user trust.

---

## References

- [OWASP Top Ten Web App Security Risks](https://owasp.org/www-project-top-ten/)
- [GitHub CodeQL Documentation](https://docs.github.com/en/code-security/code-scanning)    
- [EFF - Creativity & Innovation](https://www.eff.org/issues/creativity-innovation)
- [Snyk Security Tool](https://snyk.io/)
- [Semgrep](https://semgrep.dev/)
- [SonarQube](https://www.sonarsource.com/products/sonarqube/)
