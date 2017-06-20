# Roadmap
## Create Angular4 project
### Dependencies
    "@ng-bootstrap/ng-bootstrap": "^1.0.0-alpha.25",
    "bootstrap": "4.0.0-alpha.6",
    "font-awesome": "^4.7.0",

### Functionality 
* support 2 languages: english and russian
* login form/register form (as separate module)
* home component  (as separate module)
    * user list
    * add/edit user
    * change password
    
### Resources
* https://v4-alpha.getbootstrap.com/getting-started/introduction/
* https://ng-bootstrap.github.io/#/components/
* https://angular.io/docs/ts/latest/guide/router.html
* http://fontawesome.io/icons/
* http://jasonwatmore.com/post/2016/09/29/angular-2-user-registration-and-login-example-tutorial
* https://medium.com/@feloy/deploying-an-i18n-angular-app-with-angular-cli-fc788f17e358
* https://habrahabr.ru/company/netologyru/blog/328426/

### Technologies to master
1. XML/XML Schema <https://www.w3schools.com/xml/schema_intro.asp>
2. HTML <https://www.w3schools.com/html/html_intro.asp>
3. CSS <https://www.w3schools.com/css/css_intro.asp>
4. Bootstrap4 <https://v4-alpha.getbootstrap.com/getting-started/introduction/>
5. TypeScript/JavaScript
    * <https://www.typescriptlang.org/docs/handbook/basic-types.html>
    * <https://www.w3schools.com/js/>
6. JSON <https://www.w3schools.com/js/js_json_intro.asp>
7. Angular4
    * Template syntax <https://angular.io/docs/ts/latest/guide/template-syntax.html>
    * Structural directives <https://angular.io/docs/ts/latest/guide/structural-directives.html>
    * Component <https://angular.io/docs/ts/latest/api/core/index/Component-decorator.html>
    * Pipes <https://angular.io/docs/ts/latest/guide/pipes.html>
    * Directives <https://angular.io/docs/ts/latest/guide/attribute-directives.html>

## Next steps
1. <del>Add maven build - build the app as .war
1. <del>Deploy the app to Tomcat
1. <del>Add JSON-RPC support
1. <del>Multimodule Maven project
1. <del>Add Spring support
1. Support Spring transactions
1. Spring Data
1. JPA/Hibernate 
    1. H2 db <http://www.h2database.com/html/main.html>

### Add maven build - build the app as .war
* look at web/client project structure and pom.xml
* use Maven plugins
    * frontend-maven-plugin <https://github.com/eirslett/frontend-maven-plugin>
    * maven-war-plugin <https://maven.apache.org/plugins/maven-war-plugin/>

### Deploy the app to Tomcat
* Install Tomcal locally <http://tomcat.apache.org/download-90.cgi>
* deploy compiled .war to Tomcat

### Add JSON-RPC support
* Specification <http://www.jsonrpc.org/specification>
* JSON-RPC <https://github.com/briandilley/jsonrpc4j>

        <dependency>
            <groupId>com.github.briandilley.jsonrpc4j</groupId>
            <artifactId>jsonrpc4j</artifactId>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
        </dependency>
        <dependency>
            <groupId>javax.portlet</groupId>
            <artifactId>portlet-api</artifactId>
        </dependency>
        <dependency>
            <groupId>com.google.code.gson</groupId>
            <artifactId>gson</artifactId>
        </dependency>

* create Java DTO objects that corresponds to your client-side data model
* for each your service create Servlet that is using JsonRpcServer
* register servletes in web.xml
* in the client app call services for both development and production modes

### Multimodule Maven project
* refactor the project to the following structure
    * web - angular app, JSON-RPC servlets
    * data - data objects
    * service - extract business logic from JSON-RPC sevlets as plain singletone java beans 
* inject data and service jars as dependencies into web.war 

### Add Spring support
* <http://docs.spring.io/spring/docs/current/spring-framework-reference/htmlsingle/#beans-introduction>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-beans</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context-support</artifactId>
        </dependency>
        
* create service-context.xml descriptor in service project
* register services as beans in the context
* create ServiceContext singletone to access service instances
* use ServiceContext beans from JSON-RPC servlets

### Support Spring transactions
* <http://docs.spring.io/spring/docs/current/spring-framework-reference/htmlsingle/#transaction>
  
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-tx</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-aop</artifactId>
        </dependency>
         <dependency>
            <groupId>org.aspectj</groupId>
            <artifactId>aspectjweaver</artifactId>
        </dependency>
        <dependency>
            <groupId>org.aspectj</groupId>
            <artifactId>aspectjrt</artifactId>
        </dependency>

* add the following to `service-context.xml`
```
    <!-- update to your datasource -->
    <bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
        <property name="driverClassName" value="oracle.jdbc.driver.OracleDriver"/>
        <property name="url" value="jdbc:oracle:thin:@rj-t42:1521:elvis"/>
        <property name="username" value="scott"/>
        <property name="password" value="tiger"/>
    </bean>

    <bean id="txManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>
    
    <tx:annotation-driven />
    <aop:aspectj-autoproxy />
````
    
* Annotate service methods with [@Transactional](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/transaction/annotation/Transactional.html)

### Spring Data
* <http://docs.spring.io/spring-data/jpa/docs/1.11.3.RELEASE/reference/html/>

        <dependency>
            <groupId>org.springframework.data</groupId>
            <artifactId>spring-data-jpa</artifactId>
        </dependency>

* create new project module: dataccess - create repositories for your data objects
 
### JPA/Hibernate 
* use H2 db <http://www.h2database.com/html/main.html>
* create data/src/main/resources/META-INF/persistence.xml
