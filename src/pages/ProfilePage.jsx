// src/pages/settings/SettingsPage.jsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Lock, Save, Upload } from "lucide-react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import AppLayout from "@/layout/AppLayout";
import { useAuth } from "@/context/AuthContext";

export function ProfilePage() {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState({
    username: user?.username,
    email: user?.email,
    avatar: "",
  });

  console.log("user", user);
  console.log("profile", profile);

  // Load current user
  //   useEffect(() => {
  //     const fetchUser = async () => {
  //       try {
  //         // const res = await api.get("/auth/me");
  //         const user = user;
  //         setProfile({
  //           username: user.username,
  //           email: user.email,
  //         });
  //         if (user.avatar) {
  //           setAvatarPreview(`http://localhost:5000/uploads/${user.avatar}`);
  //         }
  //       } catch {
  //         toast.error("Failed to load profile");
  //       }
  //     };
  //     fetchUser();
  //   }, []);

  // Avatar handlers
  const handleAvatarChange = (file) => {
    if (file && file.type.startsWith("image/")) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Update profile
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!profile.username || !profile.email) {
      toast.error("Username and email are required");
      return;
    }

    const formData = new FormData();
    formData.append("username", profile.username);
    formData.append("email", profile.email);
    if (avatar) formData.append("avatar", avatar);

    setLoading(true);
    try {
      await api.put("/users/me", formData, {
        headers: { "Content-Type": undefined },
      });
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // Update password
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      toast.error("All password fields are required");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      toast.error("New passwords do not match");
      return;
    }
    if (passwords.new.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await api.put("/auth/password", {
        currentPassword: passwords.current,
        newPassword: passwords.new,
      });
      toast.success("Password changed successfully");
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Password change failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>

          {/* ───── PROFILE TAB ───── */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={avatarPreview} />
                      <AvatarFallback>
                        <User className="w-10 h-10" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="avatar-upload"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleAvatarChange(file);
                        }}
                      />
                      <Label
                        htmlFor="avatar-upload"
                        className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        <Upload className="w-4 h-4" />
                        Change Avatar
                      </Label>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG up to 2MB
                      </p>
                    </div>
                  </div>

                  {/* Username */}
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="username"
                        className="pl-10"
                        value={profile.username}
                        onChange={(e) =>
                          setProfile({ ...profile, username: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-10"
                        value={profile.email}
                        onChange={(e) =>
                          setProfile({ ...profile, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={loading}>
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ───── PASSWORD TAB ───── */}
          <TabsContent value="password" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordUpdate} className="space-y-6">
                  {/* Current Password */}
                  <div>
                    <Label htmlFor="current">Current Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="current"
                        type="password"
                        className="pl-10"
                        value={passwords.current}
                        onChange={(e) =>
                          setPasswords({
                            ...passwords,
                            current: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <Label htmlFor="new">New Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="new"
                        type="password"
                        className="pl-10"
                        value={passwords.new}
                        onChange={(e) =>
                          setPasswords({ ...passwords, new: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <Label htmlFor="confirm">Confirm New Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="confirm"
                        type="password"
                        className="pl-10"
                        value={passwords.confirm}
                        onChange={(e) =>
                          setPasswords({
                            ...passwords,
                            confirm: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={loading}>
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? "Updating..." : "Update Password"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
