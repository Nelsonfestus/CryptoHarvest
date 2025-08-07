# Tawk.to Integration Setup Guide

## 🚀 Getting Started with Tawk.to

[Tawk.to](https://www.tawk.to/) is a free live chat solution that will provide professional chat support for your CryptoHarvest platform.

## 📋 Step-by-Step Setup

### 1. Create Tawk.to Account

1. **Visit Tawk.to**: Go to [https://www.tawk.to/](https://www.tawk.to/)
2. **Sign Up**: Click "Get started - Free" and create your account
3. **Verify Email**: Check your email and verify your account

### 2. Create Your First Property

1. **Login to Dashboard**: After verification, you'll be redirected to your dashboard
2. **Add Property**: Click "Add Property" or "Create New Property"
3. **Enter Details**:
   - **Property Name**: `CryptoHarvest`
   - **Website URL**: `https://www.cryptoharvest.info`
   - **Industry**: Select "Finance" or "Cryptocurrency"

### 3. Get Your Widget Code

1. **Go to Widget Settings**: In your property dashboard, click on "Widget" in the left sidebar
2. **Copy Widget Code**: You'll see a JavaScript snippet that looks like this:
   ```javascript
   <!--Start of Tawk.to Script-->
   <script type="text/javascript">
   var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
   (function(){
   var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
   s1.async=true;
   s1.src='https://embed.tawk.to/YOUR_SITE_ID/YOUR_WIDGET_KEY/default';
   s1.charset='UTF-8';
   s1.setAttribute('crossorigin','*');
   s0.parentNode.insertBefore(s1,s0);
   })();
   </script>
   <!--End of Tawk.to Script-->
   ```

### 4. Extract Your Credentials

From the widget code, extract:
- **Site ID**: The first part after `tawk.to/` (e.g., `64f8a2b1b2c3d4e5f6a7b8c9`)
- **Widget Key**: The second part (e.g., `1h9i8j7k6l5m4n3o2p1q0r`)

### 5. Update Your Vue Component

1. **Open the file**: `src/components/TawkToChat.vue`
2. **Replace the placeholders**:
   ```javascript
   data() {
     return {
       tawkToId: 'YOUR_SITE_ID_HERE', // Replace with your actual Site ID
       tawkToKey: 'YOUR_WIDGET_KEY_HERE' // Replace with your actual Widget Key
     }
   }
   ```

### 6. Configure Chat Widget

#### Basic Settings
1. **Go to Widget Settings**: In your Tawk.to dashboard
2. **Customize Appearance**:
   - **Widget Color**: Choose colors that match your brand
   - **Widget Position**: Bottom right (recommended)
   - **Widget Size**: Default or custom
   - **Welcome Message**: "Welcome to CryptoHarvest! How can we help you today?"

#### Advanced Settings
1. **Operating Hours**: Set your support hours
2. **Auto-responder**: Create automatic responses for when agents are offline
3. **File Sharing**: Enable/disable file sharing
4. **Visitor Tracking**: Enable to see visitor information

### 7. Set Up Agents

1. **Add Agents**: Go to "Agents" in your dashboard
2. **Invite Team Members**: Send invitations to your support team
3. **Set Permissions**: Configure what each agent can do
4. **Training**: Provide agents with information about your platform

### 8. Test Your Integration

1. **Start your development server**: `npm run dev`
2. **Visit your site**: Go to `http://localhost:5173`
3. **Test the chat**: Click the "Get Support" button in the dashboard
4. **Verify functionality**: The Tawk.to widget should appear and be functional

## 🔧 Customization Options

### Custom Styling
You can customize the widget appearance in the Tawk.to dashboard:
- Colors and themes
- Widget position and size
- Welcome messages
- Agent avatars

### User Data Integration
The component automatically passes user information to Tawk.to:
- User name (from registration)
- Email address
- User role (admin/user)

### API Integration
Tawk.to provides a JavaScript API for advanced customization:
```javascript
// Show widget
window.Tawk_API.showWidget()

// Hide widget
window.Tawk_API.hideWidget()

// Maximize widget
window.Tawk_API.maximize()

// Minimize widget
window.Tawk_API.minimize()

// Set visitor data
window.Tawk_API.visitor = {
  name: 'John Doe',
  email: 'john@example.com'
}
```

## 📱 Mobile Optimization

Tawk.to automatically optimizes for mobile devices:
- Responsive design
- Touch-friendly interface
- Mobile notifications
- App integration (iOS/Android)

## 🔒 Security & Privacy

Tawk.to provides:
- SSL encryption for all communications
- GDPR compliance options
- Data retention controls
- Visitor privacy settings

## 💰 Pricing

**Tawk.to is 100% FREE** for:
- Unlimited agents
- Unlimited chats
- All core features
- No hidden fees

**Paid services** (optional):
- Hired agents ($1/hour)
- Remove branding (small fee)
- Advanced features

## 🆘 Support

If you need help with Tawk.to:
- **Live Chat**: Available on their website 24/7
- **Help Center**: Comprehensive documentation
- **Community**: Active user community
- **Email Support**: Direct support via email

## 🚀 Next Steps

After setting up Tawk.to:

1. **Train your agents** on CryptoHarvest platform
2. **Create FAQ responses** for common questions
3. **Set up auto-responders** for offline hours
4. **Monitor chat analytics** to improve support
5. **Integrate with your workflow** for seamless support

## 📊 Analytics & Reporting

Tawk.to provides detailed analytics:
- Chat volume and response times
- Agent performance metrics
- Visitor behavior analysis
- Customer satisfaction scores
- Conversion tracking

---

**Need help?** Contact the development team or refer to the [Tawk.to documentation](https://www.tawk.to/help-center/). 