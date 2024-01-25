import { Json, Color, String } from '@athenna/common'
import { Argument, BaseCommand, Generator } from '@athenna/artisan'

export class MakeCrudCommand extends BaseCommand {
  @Argument({
    description: 'The name that will be used to generate the CRUD components.'
  })
  public name: string

  public static signature(): string {
    return 'make:crud'
  }

  public static description(): string {
    return 'Generate an e2e CRUD for the application.'
  }

  public async handle(): Promise<void> {
    this.logger.simple('({bold,green} [ MAKING CRUD ])\n')

    const properties: any[] = []

    let addMoreProperties = await this.prompt.confirm(
      'Do you want to add properties to your model?'
    )

    while (addMoreProperties) {
      console.log()

      const name = await this.prompt.input(
        `What will be the ${Color.cyan('name')} of your property?`
      )
      const type = await this.prompt.list(
        `What will be the ${Color.cyan('type')} of your property?`,
        ['string', 'boolean', 'number', 'bigint', 'Date']
      )
      const defaultTo =
        (await this.prompt.input(
          `What will be the ${Color.cyan(
            'default'
          )} value of your property? Default is "null".`
        )) || undefined

      const chosens = await this.prompt.checkbox(
        'Select all the options for your model:',
        [
          'isPrimary',
          'isHidden',
          'isUnique',
          'isIndex',
          'isSparse',
          'isMainPrimary',
          'isCreateDate',
          'isUpdateDate',
          'isDeleteDate'
        ]
      )

      const property: any = {
        name,
        type
      }

      chosens.forEach(chosen => {
        property[chosen] = true
      })

      if (defaultTo) {
        property.defaultTo = defaultTo
      }

      properties.push(property)

      console.log()

      this.logger.success(`Property ${Color.cyan(name)} successfully add.`)

      console.log()

      addMoreProperties = await this.prompt.confirm(
        'Do you want to continue adding properties to your model?'
      )
    }

    console.log()
    await this.makeController()
    console.log()
    await this.makeService()
    console.log()
    await this.makeModel(properties)
    console.log()
    await this.makeMigration(properties)
  }

  private async makeController() {
    this.cleanGenerator()

    const file = await this.generator
      .fileName(this.name)
      .destination(Path.controllers())
      .path(Path.controllers(`${String.toDotCase(this.name)}.controller.ts`))
      .template('crud:controller')
      .make()

    this.logger.success(
      `Controller ({yellow} "${file.name}") successfully created.`
    )

    const importPath = this.generator
      .fileName(`${this.name}.controller`)
      .getImportPath()

    await this.rc.pushTo('controllers', importPath).save()

    this.logger.success(
      `Athenna RC updated: ({dim,yellow} [ controllers += "${importPath}" ])`
    )
  }

  private async makeService() {
    this.cleanGenerator()

    const file = await this.generator
      .fileName(this.name)
      .destination(Path.services())
      .path(Path.services(`${String.toDotCase(this.name)}.service.ts`))
      .template('crud:service')
      .make()

    this.logger.success(
      `Service ({yellow} "${file.name}") successfully created.`
    )

    const importPath = this.generator
      .fileName(`${this.name}.service`)
      .getImportPath()

    await this.rc.pushTo('services', importPath).save()

    this.logger.success(
      `Athenna RC updated: ({dim,yellow} [ services += "${importPath}" ])`
    )
  }

  private async makeModel(columns: any[]) {
    this.cleanGenerator()

    const properties = []

    columns.forEach(column => {
      let options = ''
      const opts = Json.omit(column, ['name', 'type'])
      const keys = Object.keys(opts)

      keys.forEach((key, i) => {
        if (i === 0) {
          options += `${key}: ${opts[key]}`

          return
        }

        options += `, ${key}: ${opts[key]}`
      })

      properties.push({
        name: column.name,
        type: column.type,
        annotation: `@Column(${options ? `{ ${options} }` : ''})`
      })
    })

    const file = await this.generator
      .fileName(this.name)
      .destination(Path.models())
      .path(Path.models(`${String.toDotCase(this.name)}.ts`))
      .template('crud:model')
      .properties({ properties })
      .make()

    this.logger.success(`Model ({yellow} "${file.name}") successfully created.`)

    const importPath = this.generator.getImportPath()

    await this.rc.pushTo('models', importPath).save()

    this.logger.success(
      `Athenna RC updated: ({dim,yellow} [ models += "${importPath}" ])`
    )
  }

  private async makeMigration(columns: any[]) {
    this.cleanGenerator()

    const tuples = []
    const typeMap = {
      string: 'string',
      boolean: 'boolean',
      number: 'integer',
      bigint: 'bigint',
      Date: 'dateTime'
    }

    columns.forEach(column => {
      let tuple = `builder.${typeMap[column.type]}('${column.name}')`
      const opts = Json.omit(column, ['name', 'type'])

      Object.keys(opts).forEach(key => {
        if (key === 'isPrimary') {
          tuple += '.primary()'
        }

        if (key === 'isUnique') {
          tuple += '.unique()'
        }

        if (key === 'isNullable') {
          tuple += '.nullable()'
        }

        if (key === 'defaultTo') {
          tuple += `.defaultTo(${opts[key]})`
        }

        return undefined
      })

      tuples.push(tuple)
    })

    const nameUp = this.name.toUpperCase()
    const nameCamel = String.toCamelCase(this.name)
    const namePlural = String.pluralize(this.name)
    const namePascal = String.toPascalCase(this.name)
    const namePluralCamel = String.toCamelCase(String.pluralize(this.name))
    const namePluralPascal = String.toPascalCase(String.pluralize(this.name))

    const tableName = String.pluralize(
      namePascal
        .replace('Migration', '')
        .replace('Migrations', '')
        .toLowerCase()
    )

    let [date, time] = new Date().toISOString().split('T')

    date = date.replace(/-/g, '_')
    time = time.split('.')[0].replace(/:/g, '')

    const file = await this.generator
      .fileName(`${date}_${time}_create_${tableName}_table`)
      .destination(Path.migrations())
      .properties({
        nameUp,
        nameCamel,
        namePlural,
        namePascal,
        namePluralCamel,
        namePluralPascal,
        tableName,
        tuples: tuples.join('\n')
      })
      .template('crud:migration')
      .make()

    this.logger.success(
      `Migration ({yellow} "${file.name}") successfully created.`
    )
  }

  private cleanGenerator() {
    this.generator = new Generator()
  }
}
