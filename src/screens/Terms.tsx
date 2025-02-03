import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Typography } from "../theme/Typography";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";

export default function Terms() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <ScrollView
        style={{
          paddingHorizontal: 16,
        }}
      >
        <View
          style={[
            globalStyles.header,
            {
              paddingHorizontal: 0,
              alignItems: "center",
              marginBottom: 16,
            },
          ]}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.h1}>Terms and conditions</Text>
          <View></View>
        </View>
        <Text style={styles.description}>
          These terms and conditions (&#8220;Agreement&#8221;) set forth the
          general terms and conditions of your use of the &#8220;CheapAss&#8221;
          mobile application (&#8220;Mobile Application&#8221; or
          &#8220;Service&#8221;) and any of its related products and services
          (collectively, &#8220;Services&#8221;) . This Agreement is legally
          binding between you (&#8220;User&#8221;, &#8220;you&#8221; or
          &#8220;your&#8221;) and DashnChat LLC (&#8220;DashnChat LLC&#8221;,
          &#8220;we&#8221;, &#8220;us&#8221; or &#8220;our&#8221;) . If you are
          entering into this agreement on behalf of a business or other legal
          entity, you represent that you have the authority to bind such entity
          to this agreement, in which case the terms &#8220;User&#8221;,
          &#8220;you&#8221; or &#8220;your&#8221; shall refer to such entity. If
          you do not have such authority, or if you do not agree with the terms
          of this agreement, you must not accept this agreement and may not
          access and use the Mobile Application and Services. By accessing and
          using the Mobile Application and Services, you acknowledge that you
          have read, understood, and agree to be bound by the terms of this
          Agreement. You acknowledge that this Agreement is a contract between
          you and DashnChat LLC, even though it is electronic and is not
          physically signed by you, and it governs your use of the Mobile
          Application and Services.
        </Text>

        <Text style={styles.h3}>Table of contents</Text>

        <Text style={[styles.description, styles.a]}>
          1. Accounts and membership
        </Text>
        <Text style={[styles.description, styles.a]}>2. User content</Text>
        <Text style={[styles.description, styles.a]}>3. Backups</Text>
        <Text style={[styles.description, styles.a]}>
          4. Links to other resources
        </Text>
        <Text style={[styles.description, styles.a]}>5. Prohibited uses</Text>
        <Text style={[styles.description, styles.a]}>
          6. Intellectual property rights
        </Text>
        <Text style={[styles.description, styles.a]}>
          7. Limitation of liability
        </Text>
        <Text style={[styles.description, styles.a]}>8. Indemnification</Text>
        <Text style={[styles.description, styles.a]}>9. Severability</Text>
        <Text style={[styles.description, styles.a]}>
          10. Dispute resolution
        </Text>
        <Text style={[styles.description, styles.a]}>
          11. Changes and amendments
        </Text>
        <Text style={[styles.description, styles.a]}>
          12. Acceptance of these terms
        </Text>

        <Text style={styles.h2}>Accounts and membership</Text>
        <Text style={styles.description}>
          If you create an account in the Mobile Application, you are
          responsible for maintaining the security of your account and you are
          fully responsible for all activities that occur under the account and
          any other actions taken in connection with it. We may, but have no
          obligation to, monitor and review new accounts before you may sign in
          and start using the Services. Providing false contact information of
          any kind may result in the termination of your account. You must
          immediately notify us of any unauthorized uses of your account or any
          other breaches of security. We will not be liable for any acts or
          omissions by you, including any damages of any kind incurred as a
          result of such acts or omissions. We may suspend, disable, or delete
          your account (or any part thereof) if we determine that you have
          violated any provision of this Agreement or that your conduct or
          content would tend to damage our reputation and goodwill. If we delete
          your account for the foregoing reasons, you may not re-register for
          our Services. We may block your email address and Internet protocol
          address to prevent further registration.
        </Text>

        <Text style={styles.h2} id="user-content">
          User content
        </Text>

        <Text style={styles.description}>
          We do not own any data, information or material (collectively,
          &#8220;Content&#8221;) that you submit in the Mobile Application in
          the course of using the Service. You shall have sole responsibility
          for the accuracy, quality, integrity, legality, reliability,
          appropriateness, and intellectual property ownership or right to use
          of all submitted Content. We may, but have no obligation to, monitor
          and review the Content in the Mobile Application submitted or created
          using our Services by you. You grant us permission to access, copy,
          distribute, store, transmit, reformat, display and perform the Content
          of your user account solely as required for the purpose of providing
          the Services to you. Without limiting any of those representations or
          warranties, we have the right, though not the obligation, to, in our
          own sole discretion, refuse or remove any Content that, in our
          reasonable opinion, violates any of our policies or is in any way
          harmful or objectionable. Unless specifically permitted by you, your
          use of the Mobile Application and Services does not grant us the
          license to use, reproduce, adapt, modify, publish or distribute the
          Content created by you or stored in your user account for commercial,
          marketing or any similar purpose.
        </Text>

        <Text style={styles.h2}>Backups</Text>

        <Text style={styles.description}>
          We perform regular backups of the Content and will do our best to
          ensure completeness and accuracy of these backups. In the event of the
          hardware failure or data loss we will restore backups automatically to
          minimize the impact and downtime.
        </Text>

        <Text style={styles.h2}>Links to other resources</Text>

        <Text style={styles.description}>
          Although the Mobile Application and Services may link to other
          resources (such as websites, mobile applications, etc.), we are not,
          directly or indirectly, implying any approval, association,
          sponsorship, endorsement, or affiliation with any linked resource,
          unless specifically stated herein. We are not responsible for
          examining or evaluating, and we do not warrant the offerings of, any
          businesses or individuals or the content of their resources. We do not
          assume any responsibility or liability for the actions, products,
          services, and content of any other third parties. You should carefully
          review the legal statements and other conditions of use of any
          resource which you access through a link in the Mobile Application.
          Your linking to any other off-site resources is at your own risk.
        </Text>

        <Text style={styles.h2}>Prohibited uses</Text>

        <Text style={styles.description}>
          In addition to other terms as set forth in the Agreement, you are
          prohibited from using the Mobile Application and Services or Content:
          (a) for any unlawful purpose; (b) to solicit others to perform or
          participate in any unlawful acts; (c) to violate any international,
          federal, provincial or state regulations, rules, laws, or local
          ordinances; (d) to infringe upon or violate our intellectual property
          rights or the intellectual property rights of others; (e) to harass,
          abuse, insult, harm, defame, slander, disparage, intimidate, or
          discriminate based on gender, sexual orientation, religion, ethnicity,
          race, age, national origin, or disability; (f) to submit false or
          misleading information; (g) to upload or transmit viruses or any other
          type of malicious code that will or may be used in any way that will
          affect the functionality or operation of the Mobile Application and
          Services, third party products and services, or the Internet; (h) to
          spam, phish, pharm, pretext, spider, crawl, or scrape; (i) for any
          obscene or immoral purpose; or (j) to interfere with or circumvent the
          security features of the Mobile Application and Services, third party
          products and services, or the Internet. We reserve the right to
          terminate your use of the Mobile Application and Services for
          violating any of the prohibited uses.
        </Text>

        <Text style={styles.h2}>Intellectual property rights</Text>

        <Text style={styles.description}>
          &#8220;Intellectual Property Rights&#8221; means all present and
          future rights conferred by statute, common law or equity in or in
          relation to any copyright and related rights, trademarks, designs,
          patents, inventions, goodwill and the right to sue for passing off,
          rights to inventions, rights to use, and all other intellectual
          property rights, in each case whether registered or unregistered and
          including all applications and rights to apply for and be granted,
          rights to claim priority from, such rights and all similar or
          equivalent rights or forms of protection and any other results of
          intellectual activity which subsist or will subsist now or in the
          future in any part of the world. This Agreement does not transfer to
          you any intellectual property owned by DashnChat LLC or third parties,
          and all rights, titles, and interests in and to such property will
          remain (as between the parties) solely with DashnChat LLC. All
          trademarks, service marks, graphics and logos used in connection with
          the Mobile Application and Services, are trademarks or registered
          trademarks of DashnChat LLC or its licensors. Other trademarks,
          service marks, graphics and logos used in connection with the Mobile
          Application and Services may be the trademarks of other third parties.
          Your use of the Mobile Application and Services grants you no right or
          license to reproduce or otherwise use any of DashnChat LLC or third
          party trademarks.
        </Text>

        <Text style={styles.h2}>Limitation of liability</Text>

        <Text style={styles.description}>
          To the fullest extent permitted by applicable law, in no event will
          DashnChat LLC, its affiliates, directors, officers, employees, agents,
          suppliers or licensors be liable to any person for any indirect,
          incidental, special, punitive, cover or consequential damages
          (including, without limitation, damages for lost profits, revenue,
          sales, goodwill, use of content, impact on business, business
          interruption, loss of anticipated savings, loss of business
          opportunity) however caused, under any theory of liability, including,
          without limitation, contract, tort, warranty, breach of statutory
          duty, negligence or otherwise, even if the liable party has been
          advised as to the possibility of such damages or could have foreseen
          such damages. To the maximum extent permitted by applicable law, the
          aggregate liability of DashnChat LLC and its affiliates, officers,
          employees, agents, suppliers and licensors relating to the services
          will be limited to an amount no greater than one dollar or any amounts
          actually paid in cash by you to DashnChat LLC for the prior one month
          period prior to the first event or occurrence giving rise to such
          liability. The limitations and exclusions also apply if this remedy
          does not fully compensate you for any losses or fails of its essential
          purpose.
        </Text>

        <Text style={styles.h2}>Indemnification</Text>

        <Text style={styles.description}>
          You agree to indemnify and hold DashnChat LLC and its affiliates,
          directors, officers, employees, agents, suppliers and licensors
          harmless from and against any liabilities, losses, damages or costs,
          including reasonable attorneys&#8217; fees, incurred in connection
          with or arising from any third party allegations, claims, actions,
          disputes, or demands asserted against any of them as a result of or
          relating to your Content, your use of the Mobile Application and
          Services or any willful misconduct on your part.
        </Text>

        <Text style={styles.h2}>Severability</Text>

        <Text style={styles.description}>
          All rights and restrictions contained in this Agreement may be
          exercised and shall be applicable and binding only to the extent that
          they do not violate any applicable laws and are intended to be limited
          to the extent necessary so that they will not render this Agreement
          illegal, invalid or unenforceable. If any provision or portion of any
          provision of this Agreement shall be held to be illegal, invalid or
          unenforceable by a court of competent jurisdiction, it is the
          intention of the parties that the remaining provisions or portions
          thereof shall constitute their agreement with respect to the subject
          matter hereof, and all such remaining provisions or portions thereof
          shall remain in full force and effect.
        </Text>

        <Text style={styles.h2}>Dispute resolution</Text>

        <Text style={styles.description}>
          The formation, interpretation, and performance of this Agreement and
          any disputes arising out of it shall be governed by the substantive
          and procedural laws of Missouri, United States without regard to its
          rules on conflicts or choice of law and, to the extent applicable, the
          laws of United States. The exclusive jurisdiction and venue for
          actions related to the subject matter hereof shall be the courts
          located in Missouri, United States, and you hereby submit to the
          personal jurisdiction of such courts. You hereby waive any right to a
          jury trial in any proceeding arising out of or related to this
          Agreement. The United Nations Convention on Contracts for the
          International Sale of Goods does not apply to this Agreement.
        </Text>

        <Text style={styles.h2}>Changes and amendments</Text>

        <Text style={styles.description}>
          We reserve the right to modify this Agreement or its terms related to
          the Mobile Application and Services at any time at our discretion.
          When we do, we will send you an email to notify you. We may also
          provide notice to you in other ways at our discretion, such as through
          the contact information you have provided.
        </Text>

        <Text style={styles.description}>
          An updated version of this Agreement will be effective immediately
          upon the posting of the revised Agreement unless otherwise specified.
          Your continued use of the Mobile Application and Services after the
          effective date of the revised Agreement (or such other act specified
          at that time) will constitute your consent to those changes.
        </Text>

        <Text style={styles.h2}>Acceptance of these terms</Text>

        <Text style={styles.description}>
          You acknowledge that you have read this Agreement and agree to all its
          terms and conditions. By accessing and using the Mobile Application
          and Services you agree to be bound by this Agreement. If you do not
          agree to abide by the terms of this Agreement, you are not authorized
          to access or use the Mobile Application and Services. This terms and
          conditions policy was created with the help of{" "}
          {/* <a
            href="https://www.websitepolicies.com/terms-and-conditions-generator"
            target="_blank"
          >
            WebsitePolicies
          </a> */}
          .
        </Text>

        <Text style={styles.h2}>Contacting us</Text>

        <Text style={styles.description}>
          If you have any questions, concerns, or complaints regarding this
          Agreement, we encourage you to contact us using the details below:
        </Text>

        <Text style={styles.description}>support@cheapass.app</Text>

        <Text style={styles.description}>
          This document was last updated on June 5, 2023
        </Text>

        <Image
          source={{
            uri: "https://cdn.websitepolicies.io/img/badge.png",
          }}
          style={{
            width: 200,
            height: 50,
            resizeMode: "contain",
          }}
        />
        <View
          style={{
            marginBottom: 30,
          }}
        ></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  description: {
    fontSize: 14,
    color: "white",
    fontFamily: Typography.regular,
    marginBottom: 16,
  },
  h1: {
    fontSize: 28,
    color: "white",
    fontFamily: Typography.bold,
  },
  h2: {
    fontSize: 24,
    color: "white",
    fontFamily: Typography.bold,
    marginBottom: 16,
  },
  h3: {
    fontSize: 20,
    color: "white",
    fontFamily: Typography.bold,
    marginBottom: 16,
  },
  a: {
    color: "lightblue",
    marginBottom: 8,
  },
});
