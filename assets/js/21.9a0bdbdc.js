(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{371:function(e,t,a){"use strict";a.r(t);var s=a(42),o=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"security"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#security"}},[e._v("#")]),e._v(" Security")]),e._v(" "),a("p",[e._v("This is a very brief overview of web application security. We'll go over the most common problems and how to avoid them.\nSecurity problems stem from bugs in your own application, third party applications or simple misconfiguration that allows access to what were supposed to be restricted or private areas.")]),e._v(" "),a("p",[e._v("A very good source of information about security on web is the "),a("a",{attrs:{href:"https://owasp.org",target:"_blank",rel:"noopener noreferrer"}},[e._v("Open Web Application Security Project® (OWASP)"),a("OutboundLink")],1),e._v(", which goes into way more depth than here. We roughly follow its "),a("a",{attrs:{href:"https://owasp.org/www-project-top-ten/",target:"_blank",rel:"noopener noreferrer"}},[e._v("top ten web application security risks"),a("OutboundLink")],1),e._v(" for this section -- but it's worth reading that.")]),e._v(" "),a("h2",{attrs:{id:"injection"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#injection"}},[e._v("#")]),e._v(" Injection")]),e._v(" "),a("p",[e._v("Injection flaws occur when untrusted data is sent to an interpreter as part of a command or query. The attacker’s hostile data can trick the interpreter into executing unintended commands or accessing data without proper authorization. SQL (or NoSQL) injection is the most common case, since data from forms is routinely stored. Any input might be a source of injection, even headers. It's a very dangerous attack.")]),e._v(" "),a("p",[e._v("The usual mitigation is to never use input that has not been validated, and always use safe APIs that will escape data properly. Never blacklist input: always whitelist it. When you need dynamic queries (filling the table or columns names dynamically, for example), take care to build that string in a way that does not allow injection. Check for encoding attacks, which are possible with Unicode. Clean up input as soon as it arrives, ensuring the backend is always working with clean, valid and safe data.")]),e._v(" "),a("p",[e._v('This is the most typical blunder from new developers, who treat input as if it\'s safe. It\'s not. Never. OWASP list two other points in their top ten list, "Insecure Deserialization" and "XML External Entities (XXE)", which are more specific attacks but still forms of injection.')]),e._v(" "),a("h2",{attrs:{id:"broken-authentication"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#broken-authentication"}},[e._v("#")]),e._v(" Broken authentication")]),e._v(" "),a("p",[e._v("This is more common than people think and has affected even large corporations. It happens by bugs in the authentication and session management, and allows an attack to impersonate another user; if it's an administrator account the problems are gigantic. It can also be exploited by attackers guessing passwords.")]),e._v(" "),a("p",[e._v("To prevent use well know authentication mechanisms with proven middleware, which is less likely to contain bugs, and keep it updated (since it can still contain bugs!). Implement password checks, blocking weak passwords. Use multi-factor authentication, particularly for critical systems or for critical operations (such as changing credentials). Don't make users change their passwords periodically: this adds no extra security and is just annoying. Use throttling to avoid brute force attacks.")]),e._v(" "),a("h2",{attrs:{id:"sensitive-data-exposure"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#sensitive-data-exposure"}},[e._v("#")]),e._v(" Sensitive data exposure")]),e._v(" "),a("p",[e._v("This attacks data in transit, and can include man-in-the-middle attacks or client attacks. Only send data that is necessary. Do not expose sensitive data, and follow privacy laws and regulatory requirements. Don't store sensitive data that you don't need, such as payment information that can be used for new purchases. Encrypt data at rest if it's sensitive, and encrypt data in transit always. Hash passwords with strong salted functions.")]),e._v(" "),a("h2",{attrs:{id:"broken-access-control"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#broken-access-control"}},[e._v("#")]),e._v(" Broken access control")]),e._v(" "),a("p",[e._v("Data is exposed with a direct form of access that circumvents normal access paths, such as leaving data accessible via HTTP with no authentication. All endpoints should be properly secured, including static files; and the default should be to deny access. Don't allow directory listing. Throttle API access. Add security policies detailing which users can perform which operations (again, blocking by default). Log access failures and create alerts about it.")]),e._v(" "),a("h2",{attrs:{id:"security-misconfiguration"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#security-misconfiguration"}},[e._v("#")]),e._v(" Security misconfiguration")]),e._v(" "),a("p",[e._v("Make sure your services are properly configured and secure: HTTP server, database server, SSH access. Even if you are using cloud services you are not safe: check if you configured the access properly, block any access that you can (whitelisting IPs for internal connections, for example) and the service security settings. Remember that you also have services that are not for the public, but are still attack points: code repositories, CI/CD servers, etc. Block everything that should not be open, and run the minimum amount of services that you can. Make sure that keys are properly generated and private keys are safely stored, and that you revoke access to any people or third-party services that are no longer allowed.")]),e._v(" "),a("h2",{attrs:{id:"cross-site-scripting-xss"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cross-site-scripting-xss"}},[e._v("#")]),e._v(" Cross-Site Scripting XSS")]),e._v(" "),a("p",[e._v("XSS happens when you used untrusted data in a webpage without validating and escaping it properly, allowing attackers to inject HTML or Javascript to other users. Always validate, clean and escape any data that comes from a third party, and to it with automatic tools that ensure that data is processed before it's available to the application -- manual processing is a sure source of bugs. Frontend should also escape data, which allows you for example to store plain text on the backend without worrying about HTML escaping there and instead dealing with it at render time.")]),e._v(" "),a("h2",{attrs:{id:"using-components-with-known-vulnerabilities"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#using-components-with-known-vulnerabilities"}},[e._v("#")]),e._v(" Using Components with Known Vulnerabilities")]),e._v(" "),a("p",[e._v("Any library and framework you use will run with the same privileges of your own code. Packages these days have their own dependencies, which have their own dependencies, and so on; while package managers such as npm/yarn or composer made things much simpler to use, you don't know what you're installing anymore and packages that had malicious code injected in them happened a few times. Avoid unknown code in critical applications, and always check packages you pick for safety. Keep your dependencies up-to-date, there are good tools that generate automatic warnings and pull requests for that these days.")]),e._v(" "),a("h2",{attrs:{id:"prepare-for-the-worst"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#prepare-for-the-worst"}},[e._v("#")]),e._v(" Prepare for the worst")]),e._v(" "),a("p",[e._v("You may be hacked even following all these precautions. What are you going to do in that case? It's almost impossible to clean up a compromised server. Have a plan to take any compromised servers off the grid as soon as possible -- that includes cloud services that run arbitrary code that can change local data. Analyze what happened to avoid the same attack again. Deploy new servers from scratch, using code from your repository or a safe previous release, and restore your data backups from a version that you are certain is clean. Disclose it to your users: it's moral and probably legally required.")]),e._v(" "),a("h2",{attrs:{id:"backups"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#backups"}},[e._v("#")]),e._v(" Backups")]),e._v(" "),a("p",[e._v("This is just a reminder that backups are useless if they are stored at the same place of the main data or using the same credentials. Backups should be stored at another location with a different access, automated and holding data from multiple times -- otherwise a single error in a backup, or an automated job that makes a backup of the lost data over the last (and unique) one will destroy your chances of recovery.")])])}),[],!1,null,null,null);t.default=o.exports}}]);