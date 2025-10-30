'use server'
import dbConnect from '@/lib/dbConnect'
import { IOrganization } from '@/models/interfaces'
import { Organization } from '@/models/models'

export async function getAllOrganizations() {
  await dbConnect()

  const organizations = await Organization.find()
    .sort({ name: 1 })
    .lean<IOrganization[]>()

  return {
    organizations: JSON.parse(JSON.stringify(organizations as IOrganization[])),
  }
}

export async function getBuhOrganization(organizationId: string) {
  await dbConnect()
  const organization = await Organization.findOne({
    torgKey: organizationId,
  }).lean<IOrganization>()

  return {
    organization: JSON.parse(JSON.stringify(organization as IOrganization)),
  }
}
