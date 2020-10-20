# Where to go from here

This book is meant as a basic introduction, and there is a lot that it cannot cover. It's enough to develop an entire application though, which can be quite complex and handle significant traffic even in a small server. If you want to learn more, here are some things you might want to read.

From a systems point of view, learn more about distributed architectures. While it's becoming more and more common to use cloud services and avoid most of devops, you should understand how to scale applications by dividing resources between different servers, how distributed databases work, how to split traffic between webservers with a load balancer.

Caching is quite important for fast applications. CDNs help with your static assets, but not much or at all with your API endpoints. SSRs often cache bits of HTML to compose pages more quickly. In SPAs you might want to cache resources, such as JSON fragments, or the most hit data, such as data for the frontpage. Caching is hard and there are many strategies to do it. Remember that it's useless to optimize without first profiling, so understand your bottlenecks and learn how to profile properly.

Learning more about databases is important to understand how to properly model data and how to make efficient queries. ORMs help a lot, but when you have to make reports it's often necessary to fall back to SQL, either through its API or directly, to make things more efficient. Learn to aggregate data and build reports directly through SQL queries, not overloading the webserver. Doing these operation on the database server instead of running loops in PHP is at least 10 times faster, if not 100: it's not running in an interpreted language, you don't have to fetch data over a socket, with serialization and unserialization, or the network delay.

Searching is often the slowest part of backend operations. Make sure your database indices are properly created. Keep track of slower queries. Full text search is insanely slow if done on PHP (or any language) by reading from the database and parsing. The `LIKE` operator can also be extremely slow and should only be used with very small databases or to match the start of indexed strings, where it can be fast if you DB supports it. So learn how to setup a full text index for these queries, which has the added bonus of returning better results.

Good applications are robust, and have checks to see if they are online and if any errors are happening. So learn to add active checks on your system. Even with managed cloud services, which in theory never go down, you might have problems with your own application. Sometimes invalid data might break your pages and end with a white page of death. You need to be able to detect these errors, by sending notifications to developers when they happen.

Keep reading. Software development gets old quickly.
